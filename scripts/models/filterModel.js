const redirectToYouTube = function() {
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
};

document.getElementById('searchButton').addEventListener('click', redirectToYouTube);

document.getElementById('search-bar').addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  
        redirectToYouTube();
    }
});