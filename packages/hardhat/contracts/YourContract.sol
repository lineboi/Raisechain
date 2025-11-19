//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "hardhat/console.sol";

contract raiseChain{
    struct campaign{
        string title;
        string description;
        uint256 goal;
        uint256 raised;
        uint256 deadline;
        address  payable [] beneficiaries;//made array because multiple people can benefit from a single campaign and made it payable to send ethers
        bool withdrawn; 
    }
    enum CampaignStatus { Ongoing, Successful, Failed }

    //making ID to identify each campaign
    mapping(uint256 => campaign) public campaigns;
    //track donor contributions campaignid => donor address => amount
    mapping(uint256 => mapping(address => uint256)) public contributions;
    //tracking campaign status
    mapping(uint256 => CampaignStatus) public campaignStatus;
    uint256 public campaignId=0;//starting from 0 setting campaign id

    //events
    event CampainCreates(uint256 campainID,address creator);
    event DonationReceived(uint256 campaignID,address donor,uint256 amount);
    event FundsWithdrawn(uint256 campaignID,uint256 amount);
    event RefundIssued(uint256 campaignID,address donor,uint256 amount);

    //functions
    function campaignCreate(string memory _title,string memory _description,uint256 _goal,uint256 _duration,address payable [] memory _beneficiaries) public {
        require(_goal>0,"Goal must be greater than 0");
        require(_duration>0,"Duration must be greater than 0");
        campaignId++;
        campaigns[campaignId]=campaign(_title,_description,_goal,0,block.timestamp+_duration,_beneficiaries,false);
        campaignStatus[campaignId]=CampaignStatus.Ongoing;
        emit CampainCreates(campaignId,msg.sender);
    }

    function donate(uint256 _campaignId) public payable{
        require(bytes(campaigns[_campaignId].title).length >0 ,"campaing is not available");
        require(campaigns[_campaignId].deadline > block.timestamp, "Campaign has ended");
        require(campaigns[_campaignId].withdrawn==false,"campain fund have been alread withdrawn");
        require(msg.value >0,"Donation must be greater than 0");
        campaigns[_campaignId].raised += msg.value;
        contributions[_campaignId][msg.sender] += msg.value;
        emit DonationReceived(_campaignId,msg.sender,msg.value);  
    }

}