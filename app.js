// Check if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== "undefined") {
  // Use Mist/MetaMask's provider
  web3 = new Web3(window.ethereum);
  window.ethereum.enable();
} else {
  console.log("No web3? You should consider trying MetaMask!");
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  web3 = new Web3(
    new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com:80001")
  );
}

// Your contract ABI and address
const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "allowedSeaDrop",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "ApprovalQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "BalanceQueryForZeroAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMaxSupply",
        type: "uint256",
      },
    ],
    name: "CannotExceedMaxSupplyOfUint64",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "basisPoints",
        type: "uint256",
      },
    ],
    name: "InvalidRoyaltyBasisPoints",
    type: "error",
  },
  {
    inputs: [],
    name: "MintERC2309QuantityExceedsLimit",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "total",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxSupply",
        type: "uint256",
      },
    ],
    name: "MintQuantityExceedsMaxSupply",
    type: "error",
  },
  {
    inputs: [],
    name: "MintToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "MintZeroQuantity",
    type: "error",
  },
  {
    inputs: [],
    name: "NewOwnerIsZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "NotNextOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyAllowedSeaDrop",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnerQueryForNonexistentToken",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnershipNotInitializedForExtraData",
    type: "error",
  },
  {
    inputs: [],
    name: "ProvenanceHashCannotBeSetAfterMintStarted",
    type: "error",
  },
  {
    inputs: [],
    name: "RoyaltyAddressCannotBeZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "SignersMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "TokenGatedMismatch",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferCallerNotOwnerNorApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferFromIncorrectOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToNonERC721ReceiverImplementer",
    type: "error",
  },
  {
    inputs: [],
    name: "TransferToZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "URIQueryForNonexistentToken",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "allowedSeaDrop",
        type: "address[]",
      },
    ],
    name: "AllowedSeaDropUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
    ],
    name: "BatchMetadataUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "ConsecutiveTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "newContractURI",
        type: "string",
      },
    ],
    name: "ContractURIUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newMaxSupply",
        type: "uint256",
      },
    ],
    name: "MaxSupplyUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newPotentialAdministrator",
        type: "address",
      },
    ],
    name: "PotentialOwnerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "previousHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "newHash",
        type: "bytes32",
      },
    ],
    name: "ProvenanceHashUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "referralCode",
        type: "bytes32",
      },
    ],
    name: "ReferralCodeGenerated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "referrer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ReferralRewardIssued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bps",
        type: "uint256",
      },
    ],
    name: "RoyaltyInfoUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "SeaDropTokenDeployed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cancelOwnershipTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "contractURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "fromTokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "toTokenId",
        type: "uint256",
      },
    ],
    name: "emitBatchMetadataUpdate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getColorAttributes",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "x",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "y",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "z",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "arrow",
            type: "uint8",
          },
        ],
        internalType: "struct ReferralSystem.ColorAttributes",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentMintPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "getMintStats",
    outputs: [
      {
        internalType: "uint256",
        name: "minterNumMinted",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTotalSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "maxSupply",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getReferralCode",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "x",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "y",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "z",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "arrow",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "referralCode",
        type: "bytes32",
      },
    ],
    name: "mintNFT",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "mintSeaDrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "maxSupply",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "baseURI",
            type: "string",
          },
          {
            internalType: "string",
            name: "contractURI",
            type: "string",
          },
          {
            internalType: "address",
            name: "seaDropImpl",
            type: "address",
          },
          {
            components: [
              {
                internalType: "uint80",
                name: "mintPrice",
                type: "uint80",
              },
              {
                internalType: "uint48",
                name: "startTime",
                type: "uint48",
              },
              {
                internalType: "uint48",
                name: "endTime",
                type: "uint48",
              },
              {
                internalType: "uint16",
                name: "maxTotalMintableByWallet",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "feeBps",
                type: "uint16",
              },
              {
                internalType: "bool",
                name: "restrictFeeRecipients",
                type: "bool",
              },
            ],
            internalType: "struct PublicDrop",
            name: "publicDrop",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "dropURI",
            type: "string",
          },
          {
            components: [
              {
                internalType: "bytes32",
                name: "merkleRoot",
                type: "bytes32",
              },
              {
                internalType: "string[]",
                name: "publicKeyURIs",
                type: "string[]",
              },
              {
                internalType: "string",
                name: "allowListURI",
                type: "string",
              },
            ],
            internalType: "struct AllowListData",
            name: "allowListData",
            type: "tuple",
          },
          {
            internalType: "address",
            name: "creatorPayoutAddress",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "provenanceHash",
            type: "bytes32",
          },
          {
            internalType: "address[]",
            name: "allowedFeeRecipients",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "disallowedFeeRecipients",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "allowedPayers",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "disallowedPayers",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "tokenGatedAllowedNftTokens",
            type: "address[]",
          },
          {
            components: [
              {
                internalType: "uint80",
                name: "mintPrice",
                type: "uint80",
              },
              {
                internalType: "uint16",
                name: "maxTotalMintableByWallet",
                type: "uint16",
              },
              {
                internalType: "uint48",
                name: "startTime",
                type: "uint48",
              },
              {
                internalType: "uint48",
                name: "endTime",
                type: "uint48",
              },
              {
                internalType: "uint8",
                name: "dropStageIndex",
                type: "uint8",
              },
              {
                internalType: "uint32",
                name: "maxTokenSupplyForStage",
                type: "uint32",
              },
              {
                internalType: "uint16",
                name: "feeBps",
                type: "uint16",
              },
              {
                internalType: "bool",
                name: "restrictFeeRecipients",
                type: "bool",
              },
            ],
            internalType: "struct TokenGatedDropStage[]",
            name: "tokenGatedDropStages",
            type: "tuple[]",
          },
          {
            internalType: "address[]",
            name: "disallowedTokenGatedAllowedNftTokens",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "signers",
            type: "address[]",
          },
          {
            components: [
              {
                internalType: "uint80",
                name: "minMintPrice",
                type: "uint80",
              },
              {
                internalType: "uint24",
                name: "maxMaxTotalMintableByWallet",
                type: "uint24",
              },
              {
                internalType: "uint40",
                name: "minStartTime",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "maxEndTime",
                type: "uint40",
              },
              {
                internalType: "uint40",
                name: "maxMaxTokenSupplyForStage",
                type: "uint40",
              },
              {
                internalType: "uint16",
                name: "minFeeBps",
                type: "uint16",
              },
              {
                internalType: "uint16",
                name: "maxFeeBps",
                type: "uint16",
              },
            ],
            internalType: "struct SignedMintValidationParams[]",
            name: "signedMintValidationParams",
            type: "tuple[]",
          },
          {
            internalType: "address[]",
            name: "disallowedSigners",
            type: "address[]",
          },
        ],
        internalType:
          "struct ERC721SeaDropStructsErrorsAndEvents.MultiConfigureStruct",
        name: "config",
        type: "tuple",
      },
    ],
    name: "multiConfigure",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "provenanceHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "royaltyAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "royaltyBasisPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_salePrice",
        type: "uint256",
      },
    ],
    name: "royaltyInfo",
    outputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "royaltyAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newBaseURI",
        type: "string",
      },
    ],
    name: "setBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "newContractURI",
        type: "string",
      },
    ],
    name: "setContractURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "newMaxSupply",
        type: "uint256",
      },
    ],
    name: "setMaxSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "newProvenanceHash",
        type: "bytes32",
      },
    ],
    name: "setProvenanceHash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "royaltyAddress",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "royaltyBps",
            type: "uint96",
          },
        ],
        internalType: "struct ISeaDropTokenContractMetadata.RoyaltyInfo",
        name: "newInfo",
        type: "tuple",
      },
    ],
    name: "setRoyaltyInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newPotentialOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "seaDropImpl",
        type: "address",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
          {
            internalType: "string[]",
            name: "publicKeyURIs",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "allowListURI",
            type: "string",
          },
        ],
        internalType: "struct AllowListData",
        name: "allowListData",
        type: "tuple",
      },
    ],
    name: "updateAllowList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "seaDropImpl",
        type: "address",
      },
      {
        internalType: "address",
        name: "feeRecipient",
        type: "address",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
    ],
    name: "updateAllowedFeeRecipient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "allowedSeaDrop",
        type: "address[]",
      },
    ],
    name: "updateAllowedSeaDrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "seaDropImpl",
        type: "address",
      },
      {
        internalType: "address",
        name: "payoutAddress",
        type: "address",
      },
    ],
    name: "updateCreatorPayoutAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "seaDropImpl",
        type: "address",
      },
      {
        internalType: "string",
        name: "dropURI",
        type: "string",
      },
    ],
    name: "updateDropURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "seaDropImpl",
        type: "address",
      },
      {
        internalType: "address",
        name: "payer",
        type: "address",
      },
      {
        internalType: "bool",
        name: "allowed",
        type: "bool",
      },
    ],
    name: "updatePayer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "seaDropImpl",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint80",
            name: "mintPrice",
            type: "uint80",
          },
          {
            internalType: "uint48",
            name: "startTime",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "endTime",
            type: "uint48",
          },
          {
            internalType: "uint16",
            name: "maxTotalMintableByWallet",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "feeBps",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "restrictFeeRecipients",
            type: "bool",
          },
        ],
        internalType: "struct PublicDrop",
        name: "publicDrop",
        type: "tuple",
      },
    ],
    name: "updatePublicDrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "seaDropImpl",
        type: "address",
      },
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint80",
            name: "minMintPrice",
            type: "uint80",
          },
          {
            internalType: "uint24",
            name: "maxMaxTotalMintableByWallet",
            type: "uint24",
          },
          {
            internalType: "uint40",
            name: "minStartTime",
            type: "uint40",
          },
          {
            internalType: "uint40",
            name: "maxEndTime",
            type: "uint40",
          },
          {
            internalType: "uint40",
            name: "maxMaxTokenSupplyForStage",
            type: "uint40",
          },
          {
            internalType: "uint16",
            name: "minFeeBps",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "maxFeeBps",
            type: "uint16",
          },
        ],
        internalType: "struct SignedMintValidationParams",
        name: "signedMintValidationParams",
        type: "tuple",
      },
    ],
    name: "updateSignedMintValidationParams",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "seaDropImpl",
        type: "address",
      },
      {
        internalType: "address",
        name: "allowedNftToken",
        type: "address",
      },
      {
        components: [
          {
            internalType: "uint80",
            name: "mintPrice",
            type: "uint80",
          },
          {
            internalType: "uint16",
            name: "maxTotalMintableByWallet",
            type: "uint16",
          },
          {
            internalType: "uint48",
            name: "startTime",
            type: "uint48",
          },
          {
            internalType: "uint48",
            name: "endTime",
            type: "uint48",
          },
          {
            internalType: "uint8",
            name: "dropStageIndex",
            type: "uint8",
          },
          {
            internalType: "uint32",
            name: "maxTokenSupplyForStage",
            type: "uint32",
          },
          {
            internalType: "uint16",
            name: "feeBps",
            type: "uint16",
          },
          {
            internalType: "bool",
            name: "restrictFeeRecipients",
            type: "bool",
          },
        ],
        internalType: "struct TokenGatedDropStage",
        name: "dropStage",
        type: "tuple",
      },
    ],
    name: "updateTokenGatedDrop",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]; // Replace with your contract's ABI
const contractAddress = "0x71Aacb8485177E6d4ecaB467d4B6F3B40B116bd9";

const myContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to update UI with wallet information
function updateWalletInfo() {
  web3.eth.getAccounts().then((accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      document.getElementById("wallet-status").innerText = "Connected";
    } else {
      document.getElementById("wallet-status").innerText = "Not Connected";
    }
  });
}

async function mintNFT() {
  document.getElementById("buy-spinner").style.display = "inner-block";
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const x = document.getElementById("x").value;
  const y = document.getElementById("y").value;
  const z = document.getElementById("z").value;
  const arrow = document.getElementById("arrow").value;
  const referrer = document.getElementById("referrer").value;

  myContract.methods
    .getCurrentMintPrice()
    .call()
    .then(function (price) {
      myContract.methods
        .mintNFT(account, x, y, z, arrow, referrer)
        .send({
          from: account,
          value: web3.utils.toWei(price, "wei"),
          gas: 3000000,
        })
        .on("transactionHash", function (hash) {
          console.log("Transaction Hash:", hash);
        })
        .on("confirmation", function (confirmationNumber, receipt) {
          console.log("Confirmation:", confirmationNumber);
          document.getElementById("buy-spinner").style.display = "none";
        })
        .on("receipt", function (receipt) {
          console.log("Receipt:", receipt);
        })
        .on("error", function (error, receipt) {
          console.log("Error:", error);
          document.getElementById("buy-spinner").style.display = "none";
        });
    })
    .catch(function (error) {
      console.error(error);
    });
}

// Function to get referral code
async function getReferralCode() {
  web3.eth.getAccounts().then((accounts) => {
    if (accounts.length > 0) {
      const account = accounts[0];
      myContract.methods
        .getReferralCode(account)
        .call()
        .then(function (referralCode) {
          document.getElementById("referral-code").innerText = referralCode;
          document
            .querySelector("#generate-referral-code")
            .addEventListener("click", function () {
              navigator.clipboard.writeText(
                window.location.origin +
                  window.location.pathname +
                  "?referrer=" +
                  document.getElementById("referral-code").innerText
              );
              this.innerText = "Copied!";
              setTimeout(() => {
                this.innerText = "Copy your link";
              }, 2000);
            });
        })
        .catch(function (error) {
          document.getElementById("referral-code").innerText =
            "No referral code until you mint";
        });

      myContract.methods
        .getMintStats(account)
        .call()
        .then(function ({ minterNumMinted, currentTotalSupply, maxSupply }) {
          console.log(minterNumMinted, currentTotalSupply, maxSupply);
        })
        .catch(function (error) {
          console.error(error);
        });

      myContract.methods
        .getMintStats(account)
        .call()
        .then(function ({ minterNumMinted, currentTotalSupply, maxSupply }) {
          document.getElementById("total-minted-tokens").innerText =
            minterNumMinted;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  });
}

// Function to withdraw funds
async function withdrawFunds() {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  myContract.methods
    .withdraw()
    .send({ from: account })
    .on("transactionHash", function (hash) {
      console.log("Transaction Hash:", hash);
    })
    .on("confirmation", function (confirmationNumber, receipt) {
      console.log("Confirmation:", confirmationNumber);
    })
    .on("receipt", function (receipt) {
      console.log("Receipt:", receipt);
    })
    .on("error", function (error, receipt) {
      console.log("Error:", error);
    });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("buy-spinner").style.display = "none";
  const urlParams = new URLSearchParams(window.location.search);
  const referrer = urlParams.get("referrer");
  document.getElementById("referrer").value = referrer;

  updateWalletInfo();
  getReferralCode(); // Get referral code on page load

  document
    .getElementById("buy-button")
    .addEventListener("click", function (event) {
      event.preventDefault();
      mintNFT();
    });
  document
    .getElementById("withdraw-funds")
    .addEventListener("click", function (event) {
      event.preventDefault();
      withdrawFunds();
    });
});
