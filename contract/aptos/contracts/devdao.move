// devdao.move
address 0x1 {
    module DevDao {
        use 0x1::Coin;
        use 0x1::Signer;

        struct Problem has store {
            name: string,
            git_url: string,
        }

        struct DevDao has store {
            token_id_counter: u64,
            problem_details: table<u64, Problem>,
        }

        public fun initialize(): DevDao {
            DevDao {
                token_id_counter: 0,
                problem_details: table::empty<u64, Problem>(),
            }
        }

        public fun submit_problem(
            dev_dao: &mut DevDao,
            name: string,
            git_url: string,
        ) {
            assert!(!string::is_empty(&name), 0x1);
            assert!(!string::is_empty(&git_url), 0x1);
            
            let token_id = dev_dao.token_id_counter;
            let problem = Problem { name, git_url };

            table::add(&mut dev_dao.problem_details, token_id, problem);
            dev_dao.token_id_counter = dev_dao.token_id_counter + 1;
        }

        public fun get_problem_details(dev_dao: &DevDao, token_id: u64): (string, string) {
            let problem = table::borrow(&dev_dao.problem_details, token_id);
            match problem {
                Some(p) => (p.name, p.git_url),
                None => abort 0x1,
            }
        }

        public fun get_token_counter(dev_dao: &DevDao): u64 {
            dev_dao.token_id_counter
        }
    }
}
