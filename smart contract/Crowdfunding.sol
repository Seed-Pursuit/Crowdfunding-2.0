// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract cf {

    struct Campaign {
        uint id;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    Campaign[] public campaigns;

    uint256 public numberOfCampaigns = 0;

    function createCampaign(string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public {
        require(_target > 0, "Amount must be greater then zero");
        Campaign memory campaign;

        campaign.id = numberOfCampaigns;
        campaign.owner = payable(msg.sender);
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = block.timestamp + _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaigns.push(campaign);
        numberOfCampaigns++;
    }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;
        uint received_value = campaigns[_id].amountCollected + amount;

        require(campaigns[_id].target >= received_value, "Amount must be less then or equal to target amount");
        require(campaigns[_id].deadline >= block.timestamp, "Deadline is not reach yet");

        campaigns[_id].donators.push(msg.sender);
        campaigns[_id].donations.push(amount);
        campaigns[_id].amountCollected = campaigns[_id].amountCollected + amount;
    }

    function getDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function getDonation(uint256 _id) public {
        require(campaigns[_id].owner == msg.sender, "You are not the owner");
        require(campaigns[_id].deadline <= block.timestamp, "Deadline is not reach yet");

        payable(campaigns[_id].owner).transfer(campaigns[_id].amountCollected);
    }
}