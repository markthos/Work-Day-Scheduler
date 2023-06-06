$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function() {
    var hour = $(this).parent().attr("id"); // Get the id of the containing time-block
    var userInput = $(this).siblings(".description").val(); // Get the user input from the textarea
    localStorage.setItem(hour, userInput); // Save the user input in local storage using the hour as the key
  });

  // Apply the past, present, or future class to each time block
  var currentHour = dayjs().hour(); // Get the current hour using Day.js
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").split("-")[1]); // Extract the hour from the id attribute
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // Get saved user input from localStorage and set the values of the corresponding textarea elements
  $(".time-block").each(function() {
    var hour = $(this).attr("id");
    var savedTask = localStorage.getItem(hour);
    if (savedTask) {
      $(this).find(".description").val(savedTask);
    }
  });

  // Display the current date in the header of the page
  var currentDate = dayjs().format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
});

