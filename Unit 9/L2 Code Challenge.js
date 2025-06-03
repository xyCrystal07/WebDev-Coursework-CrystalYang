// notification.js - Notification system
function showNotification(message, duration = 3000) {
    const notification = document.getElementById('notification');
    if (!notification) {
        console.error('Notification element not found');
        return;
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, duration);
}

// bookmarks.js - Bookmark functionality
function bookmarkGoal(goalNumber) {
    const goalElement = document.getElementById(`goal${goalNumber}`);
    if (!goalElement) {
        console.error(`Goal element with ID goal${goalNumber} not found`);
        return;
    }
    
    goalElement.classList.add('goal-highlight');
    
    // Store in localStorage
    const bookmarks = JSON.parse(localStorage.getItem('sdgBookmarks') || '[]');
    if (!bookmarks.includes(goalNumber)) {
        bookmarks.push(goalNumber);
        localStorage.setItem('sdgBookmarks', JSON.stringify(bookmarks));
        showNotification(`Goal ${goalNumber} bookmarked!`);
    } else {
        showNotification(`Goal ${goalNumber} already bookmarked`);
    }
    
    // Remove highlight after animation
    setTimeout(() => {
        goalElement.classList.remove('goal-highlight');
    }, 2000);
}

// form-validation.js - Form validation enhancement
function setupFormValidation() {
    const form = document.querySelector('.feedback-form form');
    if (!form) {
        console.error('Feedback form not found');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const goal = document.getElementById('favorite-goal').value.trim();
        const ideas = document.getElementById('ideas').value.trim();
        
        if (!name || !email || !goal || !ideas) {
            e.preventDefault();
            showNotification('Please fill in all fields', 4000);
            return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            showNotification('Please enter a valid email address', 4000);
            return false;
        }
        
        showNotification('Thank you for your feedback!');
        return true;
    });
}

// smooth-scroll.js - Smooth scrolling behavior
function setupSmoothScrolling() {
    // Scroll to top
    document.querySelectorAll('[href="#top"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Scroll to feedback
    document.querySelectorAll('[href="#feedback"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const feedbackSection = document.getElementById('feedback');
            if (feedbackSection) {
                feedbackSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// welcome.js - Welcome messages
function showWelcomeMessages() {
    setTimeout(() => {
        showNotification('Welcome to the Global Goals website!');
    }, 1000);
    
    // Show bookmarks if any
    const bookmarks = JSON.parse(localStorage.getItem('sdgBookmarks') || '[]');
    if (bookmarks.length > 0) {
        setTimeout(() => {
            showNotification(`You have ${bookmarks.length} bookmarked goals`);
        }, 3000);
    }
}

// fab-tooltip.js - Floating Action Button tooltip
function setupFABTooltip() {
    const fab = document.querySelector('.fab');
    if (fab) {
        fab.addEventListener('mouseenter', () => {
            fab.setAttribute('title', 'Quick feedback');
        });
    }
}

// newsletter-modal.js - Newsletter signup modal
function showNewsletterModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal-content box">
            <button class="close-modal" onclick="this.parentElement.parentElement.remove()">×</button>
            <h2>Join Our Newsletter</h2>
            <p>Stay updated on the latest Sustainable Development Goals news and initiatives.</p>
            <form onsubmit="subscribeNewsletter(event)">
                <label for="newsletter-email">Email:</label>
                <input type="email" id="newsletter-email" required>
                <button type="submit" class="cta-button">Subscribe</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function subscribeNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    // In a real app, you would send this to a server
    showNotification('Thank you for subscribing!');
    e.target.parentElement.parentElement.remove();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup all components
    setupFormValidation();
    setupSmoothScrolling();
    setupFABTooltip();
    showWelcomeMessages();
    
    // Show newsletter modal after delay
    setTimeout(showNewsletterModal, 10000);
    
    // Add bookmark buttons to all SDG items
    document.querySelectorAll('.sdg-item').forEach((item, index) => {
        const goalNumber = index + 1;
        item.id = `goal${goalNumber}`;
        
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.innerHTML = '🔖';
        bookmarkBtn.onclick = () => bookmarkGoal(goalNumber);
        item.prepend(bookmarkBtn);
    });
});