const { Post } = require("../models");

const postData = [
  {
    title: `In a linked list of size n, where n is even, the ith node (0-indexed) of the linked list is known as the twin of the (n-1-i)th node, if 0 <= i <= (n / 2) - 1.

    For example, if n = 4, then node 0 is the twin of node 3, and node 1 is the twin of node 2. These are the only nodes with twins for n = 4.
    The twin sum is defined as the sum of a node and its twin.
    
    Given the head of a linked list with even length, return the maximum twin sum of the linked list.`,
    body: `/**
    * Definition for singly-linked list.
    * function ListNode(val, next) {
    *     this.val = (val===undefined ? 0 : val)
    *     this.next = (next===undefined ? null : next)
    * }
    */
   /**
    * @param {ListNode} head
    * @return {number}
    */
   var pairSum = function(head) {
       
   };`,
  likes:0,
    user_id: 1,
  },
  {
    title: `Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:

    '?' Matches any single character.
    '*' Matches any sequence of characters (including the empty sequence).
    The matching should cover the entire input string (not partial).`,
    body: `/**
    * @param {string} s
    * @param {string} p
    * @return {boolean}
    */
   var isMatch = function(s, p) {
       
   }; `,
      likes:0,
    user_id: 2,
  },
  {
    title:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    body: `var twoSum = function(nums, target) {
      for(let x = 0; x < nums.length; x++) {
         for(let y = 1; y< nums.length; y++) {
             if(nums[x] + nums[y] === target && x!=y) {
                 return [x,y];
             }
         }
      }
  };
   `,
    likes:0,
    user_id: 3,
  },
];
// uses the Post.bulkCreate method provided by Sequelize to create multiple user records in the database at once.
const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
