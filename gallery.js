let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = 'characters.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Call a function here to start the timer for the slideshow
  startTimer()
  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
  $('.moreIndicator').on('click', () => {
    $('.moreIndicator').toggleClass('rot90').toggleClass('rot270')
    $('.details').slideToggle()
  })
  // Select the "Next Photo" button and add a click event to call showNextPhoto
  $('#nextPhoto').on('click', showNextPhoto)
  // Select the "Previous Photo" button and add a click event to call showPrevPhoto
  $('#prevPhoto').on('click', showPrevPhoto)
  // Call fetchJSON() to load the initial set of images
  fetchJSON(mUrl)
})

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  // Use $.ajax here to request the JSON data from mUrl
  $.ajax({
    url: mUrl,
    async: true,
    datatype: 'json',
    success: data => {
      mImages = data.characters
      swapPhoto()
      //startTimer()
    }
  })
  // On success, parse the JSON and push each image object into mImages array
  // After JSON is loaded, call swapPhoto() to display the first image
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
  // Access mImages[mCurrentIndex] to update the image source and details
  mImages[mCurrentIndex]
  // Update the #photo element's src attribute with the current image's path
  $('#photo').attr('src', mImages[mCurrentIndex].imgPath)
  $('#photo').css("maxWidth", "300px")
  // Update the .location, .description, and .date elements with the current image's details
  $('.banner').text(mImages[mCurrentIndex].charName)
  $('.descText').text(mImages[mCurrentIndex].charDesc)
  $('.healthStat').text(mImages[mCurrentIndex].stats.health)
  $('.checkStat').text(mImages[mCurrentIndex].stats.skillCheck)
  $('.speedStat').text(mImages[mCurrentIndex].stats.speed)
  $('.stamStat').text(mImages[mCurrentIndex].stats.stamina)
  $('.stealthStat').text(mImages[mCurrentIndex].stats.stealth)
  $('.extraStat').text(mImages[mCurrentIndex].stats.extraction)
  //Abilities
  $('#abilityName1').text(mImages[mCurrentIndex].abilities.ability1.name)
  $('#abilityTog1').text(mImages[mCurrentIndex].abilities.ability1.toggle)
  $('#abilityDesc1').text(mImages[mCurrentIndex].abilities.ability1.description)
  $('#abilityName2').text(mImages[mCurrentIndex].abilities.ability2.name)
  $('#abilityTog2').text(mImages[mCurrentIndex].abilities.ability2.toggle)
  $('#abilityDesc2').text(mImages[mCurrentIndex].abilities.ability2.description)

  //old code
  /* $('.location').text('Location: ' + mImages[mCurrentIndex].imgLocation)
  $('.description').text('Description: ' + mImages[mCurrentIndex].description)
  $('.date').text('Date: ' + mImages[mCurrentIndex].date) */
}

// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
  // Increment mCurrentIndex and call swapPhoto()
  mCurrentIndex++
  swapPhoto()
  // Ensure it loops back to the beginning if mCurrentIndex exceeds array length
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  // Decrement mCurrentIndex and call swapPhoto()
  mCurrentIndex--
  swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
  if (mCurrentIndex < 0) {
    mCurrentIndex = mImages.length - 1
  }
}

// Starter code for the timer function
function startTimer () {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  setInterval(showNextPhoto, mWaitTime)
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time
}
