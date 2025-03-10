document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Check for saved theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        // Toggle theme
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        
        // Update theme
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
    });

    // Update theme icon
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // Filter configurations for each section
    const filterConfigs = {
        'tools': {
            categories: [
                { id: 'all', label: 'All' },
                { id: 'editor', label: 'Code Editors' },
                { id: 'version', label: 'Version Control' },
                { id: 'deployment', label: 'Deployment' },
                { id: 'testing', label: 'Testing' },
                { id: 'database', label: 'Database' },
                { id: 'design', label: 'Design' },
                { id: 'api', label: 'API Tools' },
                { id: 'devops', label: 'DevOps' }
            ]
        },
        'extensions': {
            categories: [
                { id: 'all', label: 'All' },
                { id: 'vscode', label: 'VS Code' },
                { id: 'chrome', label: 'Chrome' },
                { id: 'firefox', label: 'Firefox' },
                { id: 'productivity', label: 'Productivity' },
                { id: 'debugging', label: 'Debugging' },
                { id: 'formatting', label: 'Formatting' }
            ]
        },
        'guides': {
            categories: [
                { id: 'all', label: 'All' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend' },
                { id: 'devops', label: 'DevOps' },
                { id: 'database', label: 'Database' },
                { id: 'security', label: 'Security' },
                { id: 'testing', label: 'Testing' },
                { id: 'architecture', label: 'Architecture' }
            ]
        },
        'ai-tools': {
            categories: [
                { id: 'all', label: 'All' },
                { id: 'code-completion', label: 'Code Completion' },
                { id: 'code-review', label: 'Code Review' },
                { id: 'documentation', label: 'Documentation' },
                { id: 'testing', label: 'Testing' },
                { id: 'chat', label: 'Chat Assistants' },
                { id: 'free', label: 'Free' },
                { id: 'paid', label: 'Paid' }
            ]
        },
        'roadmaps': {
            categories: [
                { id: 'all', label: 'All' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend' },
                { id: 'fullstack', label: 'Full Stack' },
                { id: 'devops', label: 'DevOps' },
                { id: 'mobile', label: 'Mobile Dev' },
                { id: 'cloud', label: 'Cloud' },
                { id: 'ai', label: 'AI/ML' }
            ]
        },
        'projects': {
            categories: [
                { id: 'all', label: 'All' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend' },
                { id: 'fullstack', label: 'Full Stack' },
                { id: 'beginner', label: 'Beginner' },
                { id: 'intermediate', label: 'Intermediate' },
                { id: 'advanced', label: 'Advanced' },
                { id: 'react', label: 'React' },
                { id: 'node', label: 'Node.js' },
                { id: 'python', label: 'Python' }
            ]
        }
    };

    // Initialize filters for all sections
    Object.keys(filterConfigs).forEach(sectionId => {
        initializeFilter(sectionId, filterConfigs[sectionId]);
    });

    function initializeFilter(sectionId, config) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        // Create filter buttons dynamically
        const filterBar = section.querySelector('.filter-bar');
        if (filterBar) {
            filterBar.innerHTML = config.categories.map(category => `
                <button class="filter-btn ${category.id === 'all' ? 'active' : ''}" 
                        data-filter="${category.id}">
                    ${category.label}
                </button>
            `).join('');
        }

        const filterButtons = section.querySelectorAll('.filter-btn');
        const cards = section.querySelectorAll('.card');

        // Add click event to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                // Filter cards with animation
                filterCards(cards, filter);
            });
        });
    }

    function filterCards(cards, filter) {
        cards.forEach(card => {
            const categories = card.getAttribute('data-category')?.split(' ') || [];
            
            if (filter === 'all' || categories.includes(filter)) {
                showCard(card);
            } else {
                hideCard(card);
            }
        });
    }

    function showCard(card) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.5s ease forwards';
    }

    function hideCard(card) {
        card.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => {
            card.style.display = 'none';
        }, 500);
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }

    .filter-btn {
        padding: 0.5rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .filter-btn:hover {
        background: var(--accent-primary);
        color: white;
    }

    .filter-btn.active {
        background: var(--accent-primary);
        color: white;
        border-color: var(--accent-primary);
    }

    .card {
        animation: fadeIn 0.5s ease forwards;
    }

    .filter-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;
        justify-content: center;
    }

    @media (max-width: 575px) {
        .filter-bar {
            flex-direction: column;
            align-items: stretch;
        }

        .filter-btn {
            width: 100%;
            padding: 0.75rem;
        }
    }
`;

document.head.appendChild(style);
