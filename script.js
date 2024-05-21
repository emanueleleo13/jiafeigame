document.addEventListener('DOMContentLoaded', function() {
    const jiafei = document.getElementById('jiafei');
    const productsContainer = document.getElementById('products');
    const temuFactory = document.getElementById('temu-factory');

    let jiafeiX = 375; // Initial X position of Jiafei
    const jiafeiSpeed = 10;

    // Move Jiafei based on arrow keys or ASWD keys
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft' || event.key === 'a') {
            jiafeiX -= jiafeiSpeed;
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            jiafeiX += jiafeiSpeed;
        }

        // Ensure Jiafei stays within game boundaries
        jiafeiX = Math.max(0, Math.min(jiafeiX, 750)); // 750 = game container width - jiafei width

        jiafei.style.left = jiafeiX + 'px';

        // Check for collision with products
        checkCollision();
    });

    // Function to check collision between Jiafei and products
    function checkCollision() {
        const jiafeiRect = jiafei.getBoundingClientRect();
        const products = productsContainer.getElementsByClassName('product');

        for (let product of products) {
            const productRect = product.getBoundingClientRect();

            if (jiafeiRect.left < productRect.right && 
                jiafeiRect.right > productRect.left && 
                jiafeiRect.bottom > productRect.top && 
                jiafeiRect.top < productRect.bottom) {
                alert('Oh no! Jiafei got hit by a product!');
                resetGame();
                return;
            }
        }

        // Check if Jiafei reached the temu factory
        const temuFactoryRect = temuFactory.getBoundingClientRect();
        if (jiafeiRect.left < temuFactoryRect.right && 
            jiafeiRect.right > temuFactoryRect.left && 
            jiafeiRect.bottom > temuFactoryRect.top && 
            jiafeiRect.top < temuFactoryRect.bottom) {
            alert('Congratulations! Jiafei reached the Temu factory!');
            resetGame();
        }
    }

    // Function to reset the game
    function resetGame() {
        jiafeiX = 375;
        jiafei.style.left = jiafeiX + 'px';
    }

    // Generate random products
    setInterval(function() {
        const product = document.createElement('div');
        product.classList.add('product');
        product.style.left = Math.random() * 750 + 'px'; // Random X position within game container width
        productsContainer.appendChild(product);

        // Remove products that have moved past Jiafei
        const products = productsContainer.getElementsByClassName('product');
        for (let product of products) {
            if (product.getBoundingClientRect().top < 0) {
                productsContainer.removeChild(product);
            }
        }
    }, 2000); // Generate a product every 2 seconds
});