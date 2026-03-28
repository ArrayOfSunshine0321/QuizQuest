document.addEventListener('DOMContentLoaded', function () {
    const quizzes = {
        movies_tv: ['movies_tv1.html', 'movies_tv.html'],
        sport: ['sports.html', 'sports2.html'],
        tech: ['tech1.html', 'tech.html'],
        GK: ['gk.html', 'gk copy.html'],
        inve: ['invent.html'],
        geo: ['geo2.html', 'geo.html'],
        History: ['his.html'],
        AD: ['a&d.html'],
        Music: ['music.html'],
        Atlas: ['atlas.html'],
        Brands: ['brands.html', 'brands copy.html'],
        Literature: ['lite.html'],
        Bio: ['bio.html', 'bio2.html'],
        Cartoon: ['cartoon.html'],  
        Chem: ['chem.html']
    };

    function getRandomQuiz(category) {
        const quizzesArray = quizzes[category];
        if (!quizzesArray) return null;
        const randomIndex = Math.floor(Math.random() * quizzesArray.length);
        return quizzesArray[randomIndex];
    }

    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const category = link.getAttribute('data-category');
            const randomQuiz = getRandomQuiz(category);
            if (randomQuiz) {
                window.location.href = randomQuiz;
            } else {
                console.warn(`No quizzes found for category: ${category}`);
            }
        });
    });
});






/*
    const categoryLinks = document.querySelectorAll('.categories');

    if (categoryLinks.length > 0) {
        categoryLinks.forEach(Link => {
            Link.addEventListener('click', event => {
                event.preventDefault();
                const category = Link.getAttribute('data-category');
                if (quizzes[category]) {
                    const randomQuiz = quizzes[category][Math.floor(Math.random() * quizzes[category].length)];
                    window.location.href = randomQuiz;
                } else {
                    console.error(`Category '${category}' not found in quizzes object.`);
                }
            });
        });
    } else {
        console.error("No category links found.");
    }
*/