
// // => 1 Function to handle the like button click event
// const handleLike = async (postId) => {
//     try {
//       // Send a POST request to the server endpoint that handles post likes
//       const response = await fetch(`/api/posts/${postId}/like`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         // If the request is successful, parse the response JSON
//         const data = await response.json();
  
//         // Update the like count on the page
//         const likesCountSpan = document.getElementById('likesCount');
//         likesCountSpan.textContent = data.likes;
//       } else {
//         throw new Error('Request failed');
//       }
//     } catch (error) {
//       console.error('Error liking post:', error);
//     }
//   };
  
//   //Add event listener to the like button
// const likeButton = document.getElementById('likeButton');
// likeButton.addEventListener('click', () => {
//   const postId = likeButton.getAttribute('data-post-id');
//   handleLike(postId);
// });
  


// => 2 FUNCTION TO HANDLE THE LIKE BUTTON AND SAVE USER IN THE LOCAL STORAGE
// const handleLike = async (postId) => {
//     try {
//       // Check if the user has already liked the post
//       const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
//       if (likedPosts.includes(postId)) {
//         console.log('User has already liked this post.');
//         alert('User has already liked this post.');
//         return;
//       }
  
//       // Send a POST request to the server endpoint that handles post likes
//       const response = await fetch(`/api/posts/${postId}/like`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         // If the request is successful, parse the response JSON
//         const data = await response.json();
  
//         // Update the like count on the page
//         const likesCountSpan = document.getElementById('likesCount');
//         likesCountSpan.textContent = data.likes;
  
//         // Store the liked post ID in local storage to prevent multiple likes
//         likedPosts.push(postId);
//         localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
//       } else {
//         throw new Error('Request failed');
//       }
//     } catch (error) {
//       console.error('Error liking post:', error);
//     }
//   };
  
//   // Add event listener to the like button
//   const likeButton = document.getElementById('likeButton');
//   likeButton.addEventListener('click', () => {
//     const postId = likeButton.getAttribute('data-post-id');
//     handleLike(postId);
//   });
  

// => 3 FUNCTION TO HANDLE THE LIKE BUTTON CLICK TO AVOID SAME USER CLICK TWICE
// user allows to like one like per one page
// const handleLike = async (postId) => {
//     try {
//       // Send a POST request to the server endpoint that handles post likes
//       const response = await fetch(`/api/posts/${postId}/like`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (response.ok) {
//         // If the request is successful, parse the response JSON
//         const data = await response.json();
  
//         // Update the like count on the page
//         const likesCountSpan = document.getElementById('likesCount');
//         likesCountSpan.textContent = data.likes;
  
//         // Disable the like button after clicking
//         const likeButton = document.getElementById('likeButton');
//         likeButton.disabled = true;
//       } else if (response.status === 400) {
//         const data = await response.json();
//         console.log(data.message);
//       } else {
//         throw new Error('Request failed');
//       }
//     } catch (error) {
//       console.error('Error liking post:', error);
//     }
//   };
  
//   // Add event listener to the like button
//   const likeButton = document.getElementById('likeButton');
//   likeButton.addEventListener('click', () => {
//     const postId = likeButton.getAttribute('data-post-id');
//     handleLike(postId);
//   });
  
// Get the like button and likes count elements
const likeButton = document.getElementById("likeButton");
const likesCount = document.getElementById("likesCount");

// Get the post ID from the data attribute
const postId = likeButton.dataset.postId;

// Event handler for the like button click
async function handleLike() {
  try {
    // Disable the like button
    likeButton.disabled = true;

    // Send a POST request to like the post
    const response = await fetch(`/api/posts/${postId}/like`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Error liking post");
    }

    // Parse the response JSON data
    const data = await response.json();

    // Update the likes count
    likesCount.innerText = data.likes;

    // Display a message or perform any other actions
    console.log("Post liked!");

  } catch (error) {
    console.error(error);
    // Re-enable the like button on error
    likeButton.disabled = false;
  }
}

// Attach the event listener to the like button
likeButton.addEventListener("click", handleLike);
