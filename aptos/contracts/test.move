module MyNFT::NFTMinting {
    use std::signer;
    use std::string;
    use std::vector;
    use std::event;

    /// Error codes for better debugging
    const ENO_COLLECTION: u64 = 1;
    const EINVALID_NFT_ID: u64 = 2;

    /// Event for NFT creation
    struct MintEvent has store, drop {
        creator: address,
        nft_id: u64,
        name: string::String,
    }

    /// Event for NFT transfer
    struct TransferEvent has store, drop {
        sender: address,
        recipient: address,
        nft_id: u64,
    }

    /// NFT structure
    struct NFT has key, store {
        id: u64,
        name: string::String,
        description: string::String,
        uri: string::String,
        creator: address,
    }

    /// Collection structure
    struct NFTCollection has key, store {
        nfts: vector::Vector<NFT>, // List of NFTs
        count: u64,                // Total NFTs minted
        owner: address,            // Owner of the collection
    }

    /// Storage for events
    struct EventStore has key, store {
        mint_events: event::EventHandle<MintEvent>,
        transfer_events: event::EventHandle<TransferEvent>,
    }

    /// Initialize the collection for the caller
    public fun initialize_collection(account: &signer) {
        let owner_address = signer::address_of(account);
        
        // Ensure the collection doesn't already exist
        if (!exists<NFTCollection>(owner_address)) {
            let collection = NFTCollection {
                nfts: vector::empty<NFT>(),
                count: 0,
                owner: owner_address,
            };
            move_to(account, collection);

            // Initialize event storage for the user
            let events = EventStore {
                mint_events: event::new_event_handle<MintEvent>(account),
                transfer_events: event::new_event_handle<TransferEvent>(account),
            };
            move_to(account, events);
        }
    }

    /// Mint a new NFT and add it to the caller's collection
    public fun mint_nft(
        account: &signer,
        name: string::String,
        description: string::String,
        uri: string::String
    ) {
        let owner_address = signer::address_of(account);

        // Ensure the collection exists
        assert!(exists<NFTCollection>(owner_address), ENO_COLLECTION, "Collection not initialized!");

        // Borrow the collection and add the NFT
        let collection = borrow_global_mut<NFTCollection>(owner_address);
        let new_id = collection.count;

        let nft = NFT {
            id: new_id,
            name: name.clone(),
            description,
            uri,
            creator: owner_address,
        };

        vector::push_back(&mut collection.nfts, nft);
        collection.count = collection.count + 1;

        // Emit a mint event
        let events = borrow_global_mut<EventStore>(owner_address);
        event::emit_event(
            &mut events.mint_events,
            MintEvent {
                creator: owner_address,
                nft_id: new_id,
                name,
            },
        );
    }

    /// Transfer an NFT to another user
    public fun transfer_nft(
        sender: &signer,
        recipient: address,
        nft_id: u64
    ) {
        let sender_address = signer::address_of(sender);

        // Ensure sender has a collection
        assert!(exists<NFTCollection>(sender_address), ENO_COLLECTION, "Sender has no collection!");

        // Borrow the sender's collection
        let sender_collection = borrow_global_mut<NFTCollection>(sender_address);

        // Validate NFT ID
        assert!(nft_id < vector::length(&sender_collection.nfts), EINVALID_NFT_ID, "Invalid NFT ID!");

        // Remove NFT from sender and transfer to recipient
        let nft = vector::remove(&mut sender_collection.nfts, nft_id);

        // Ensure recipient's collection exists
        if (!exists<NFTCollection>(recipient)) {
            let recipient_collection = NFTCollection {
                nfts: vector::empty<NFT>(),
                count: 0,
                owner: recipient,
            };
            move_to(&signer::borrow_global(recipient), recipient_collection);
        }

        let recipient_collection = borrow_global_mut<NFTCollection>(recipient);
        vector::push_back(&mut recipient_collection.nfts, nft);

        // Emit a transfer event
        let sender_events = borrow_global_mut<EventStore>(sender_address);
        event::emit_event(
            &mut sender_events.transfer_events,
            TransferEvent {
                sender: sender_address,
                recipient,
                nft_id,
            },
        );
    }

    /// Get an NFT by ID from the user's collection
    public fun get_nft(account: address, id: u64): NFT acquires NFTCollection {
        assert!(exists<NFTCollection>(account), ENO_COLLECTION, "No collection found for this account!");

        let collection = borrow_global<NFTCollection>(account);
        assert!(id < vector::length(&collection.nfts), EINVALID_NFT_ID, "NFT with this ID does not exist!");
        
        *vector::borrow(&collection.nfts, id)
    }

    /// Get all NFTs in the user's collection
    public fun get_all_nfts(account: address): vector::Vector<NFT> acquires NFTCollection {
        assert!(exists<NFTCollection>(account), ENO_COLLECTION, "No collection found for this account!");

        let collection = borrow_global<NFTCollection>(account);
        collection.nfts
    }

    /// Get mint events for the user
    public fun get_mint_events(account: address): event::EventHandle<MintEvent> acquires EventStore {
        let events = borrow_global<EventStore>(account);
        events.mint_events
    }

    /// Get transfer events for the user
    public fun get_transfer_events(account: address): event::EventHandle<TransferEvent> acquires EventStore {
        let events = borrow_global<EventStore>(account);
        events.transfer_events
    }
}
