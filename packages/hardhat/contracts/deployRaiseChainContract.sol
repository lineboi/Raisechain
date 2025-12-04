//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract RaiseChainContract {
    
    struct Campaign {
        string title;
        string description;
        uint256 goal;
        uint256 raised;
        uint256 deadline;
        address payable [] beneficiaries;
        bool withdrawn; 
    }
    
    enum CampaignStatus { Ongoing, Successful, Failed }

    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public contributions;
    mapping(uint256 => CampaignStatus) public campaignStatus;
    uint256 public nextCampaignId = 1;

    event CampaignCreated(uint256 campaignID, address creator);
    event DonationReceived(uint256 campaignID, address donor, uint256 amount);
    event FundsWithdrawn(uint256 campaignID, uint256 amount);
    event RefundIssued(uint256 campaignID, address donor, uint256 amount);

    function campaignCreate(
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _duration,
        address payable [] memory _beneficiaries
    ) public returns (uint256) {
        require(_goal > 0, "Goal must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        require(_beneficiaries.length > 0, "Must specify at least one beneficiary.");

        uint256 currentId = nextCampaignId;
        
        campaigns[currentId] = Campaign(_title,_description,_goal,0,block.timestamp + _duration,_beneficiaries,false);
        campaignStatus[currentId] = CampaignStatus.Ongoing;
        nextCampaignId++;
        
        emit CampaignCreated(currentId, msg.sender);
        return currentId;
    }

    function donate(uint256 _campaignId) public payable {
        require(bytes(campaigns[_campaignId].title).length > 0, "Campaign is not available or does not exist.");
        require(campaigns[_campaignId].deadline > block.timestamp, "Campaign has ended.");
        require(campaigns[_campaignId].withdrawn == false, "Campaign funds have already been withdrawn.");
        require(msg.value > 0, "Donation must be greater than 0");
        
        campaigns[_campaignId].raised += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;
        
        emit DonationReceived(_campaignId, msg.sender, msg.value);  
    }

    function withdrawFunds(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];
        
        require(bytes(campaign.title).length > 0, "Campaign does not exist.");
        
        bool isBeneficiary = false;
        for (uint i = 0; i < campaign.beneficiaries.length; i++) {
            if (campaign.beneficiaries[i] == msg.sender) {
                isBeneficiary = true;
                break;
            }
        }
        require(isBeneficiary, "Only a listed beneficiary can withdraw funds.");
        
        require(campaign.deadline < block.timestamp, "Campaign deadline has not passed.");
        require(campaign.raised >= campaign.goal, "Funding goal was not met.");
        require(campaign.withdrawn == false, "Funds have already been withdrawn.");
        
        campaign.withdrawn = true;
        campaignStatus[_campaignId] = CampaignStatus.Successful;

        uint256 amountToWithdraw = campaign.raised;
        uint256 numberOfBeneficiaries = campaign.beneficiaries.length;
        uint256 share = amountToWithdraw / numberOfBeneficiaries;
        uint256 remainder = amountToWithdraw % numberOfBeneficiaries;
        
        for (uint i = 0; i < numberOfBeneficiaries; i++) {
            (bool success, ) = campaign.beneficiaries[i].call{value: share}("");
            require(success, "Ether transfer to beneficiary failed.");
        }
        
        if (remainder > 0) {
            (bool success, ) = campaign.beneficiaries[0].call{value: remainder}("");
            require(success, "Remainder transfer failed.");
        }
        
        emit FundsWithdrawn(_campaignId, amountToWithdraw);
    }
    
    function getRefund(uint256 _campaignId) public {
        Campaign storage campaign = campaigns[_campaignId];

        require(bytes(campaign.title).length > 0, "Campaign does not exist.");

        uint256 amountToRefund = contributions[_campaignId][msg.sender];
        require(amountToRefund > 0, "You have no funds to claim for this campaign.");

        require(campaign.deadline < block.timestamp, "Campaign deadline has not passed yet.");
        require(campaign.raised < campaign.goal, "Funding goal was met. Refunds are not available.");
        require(campaign.withdrawn == false, "Campaign funds were already finalized.");

        contributions[_campaignId][msg.sender] = 0;

        if (campaignStatus[_campaignId] != CampaignStatus.Failed) {
            campaignStatus[_campaignId] = CampaignStatus.Failed;
        }

        (bool success, ) = payable(msg.sender).call{value: amountToRefund}("");
        require(success, "Ether transfer for refund failed.");

        emit RefundIssued(_campaignId, msg.sender, amountToRefund);
    }

    // Read-only function for frontend data display
    function getCampaign(uint256 _campaignId)
        public
        view
        returns (
            string memory title,
            string memory description,
            uint256 goal,
            uint256 raised,
            uint256 deadline,
            address payable[] memory beneficiaries,
            bool withdrawn
        )
    {
        Campaign storage campaign = campaigns[_campaignId];
        require(bytes(campaign.title).length > 0, "Campaign does not exist.");

        return (
            campaign.title,
            campaign.description,
            campaign.goal,
            campaign.raised,
            campaign.deadline,
            campaign.beneficiaries,
            campaign.withdrawn
        );
    }
    
    // Read-only function for frontend to check donor contribution
    function getContribution(uint256 _campaignId, address _donor)
        public
        view
        returns (uint256)
    {
        return contributions[_campaignId][_donor];
    }
}