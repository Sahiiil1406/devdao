// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DevDao is ERC721 {
    uint256 private _tokenIdCounter;

    struct Problem {
        string name;
        string gitUrl;
    }

    mapping(uint256 => Problem) private _problemDetails;

    event ProblemSubmitted(
        address indexed submitter,
        uint256 indexed tokenId,
        string name,
        string gitUrl
    );

    event QuestionSubmitted(
        address indexed submitter,
        uint256 indexed tokenId,
        string question,
        string gitUrl
    );

    constructor() ERC721("ProblemSubmissionNFT", "PSNFT") {
        _tokenIdCounter = 0;
    }

    /**
     * @dev Mints an NFT for a problem submission.
     * @param name The name of the problem.
     * @param gitUrl The Git URL associated with the problem.
     */
    function submitProblem(string calldata name, string calldata gitUrl) public {
        require(bytes(name).length > 0, "Problem name cannot be empty");
        require(bytes(gitUrl).length > 0, "Git URL cannot be empty");

        uint256 tokenId = _tokenIdCounter;
        _safeMint(msg.sender, tokenId);  // Mint NFT for the submitter

        // Store problem details with the token ID
        _problemDetails[tokenId] = Problem({
            name: name,
            gitUrl: gitUrl
        });

        emit ProblemSubmitted(msg.sender, tokenId, name, gitUrl);

        _tokenIdCounter++;  // Increment token counter for next submission
    }

    /**
     * @dev Mints an NFT for a question submission.
     * @param question The content of the question.
     * @param gitUrl The Git URL associated with the question.
     */
    function submitQuestion(string calldata question, string calldata gitUrl) public {
        require(bytes(question).length > 0, "Question cannot be empty");
        require(bytes(gitUrl).length > 0, "Git URL cannot be empty");

        uint256 tokenId = _tokenIdCounter;
        _safeMint(msg.sender, tokenId);  // Mint NFT for the submitter

        // Store problem details with the token ID
        _problemDetails[tokenId] = Problem({
            name: question,
            gitUrl: gitUrl
        });

        emit QuestionSubmitted(msg.sender, tokenId, question, gitUrl);

        _tokenIdCounter++;  // Increment token counter for next submission
    }

    /**
     * @dev Retrieves details of a problem or question using the token ID.
     * @param tokenId The ID of the token representing the problem or question.
     * @return name The name or content of the problem or question.
     * @return gitUrl The Git URL of the problem or question.
     */
    function getProblemDetails(uint256 tokenId)
        public
        view
        returns (string memory name, string memory gitUrl)
    {
        // Check if the token exists by checking if the owner is non-zero
        try this.ownerOf(tokenId) {
            // If successful, token exists, so return details
            Problem storage problem = _problemDetails[tokenId];
            return (problem.name, problem.gitUrl);
        } catch {
            revert("Token does not exist");
        }
    }

    /**
     * @dev Returns the current token counter.
     * @return uint256 The next token ID to be minted.
     */
    function getTokenCounter() public view returns (uint256) {
        return _tokenIdCounter;
    }
}
