const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  theme: {
    extend: {
      boxShadow: {
        'xl': '5px 10px 8px -5px rgb(0 0 0 / 0.3)',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        },
      keyframes: {
        flashFade: {
          "0%": { transform: "translateX(180px)", opacity: 0 },
          "10%": { transform: "translateX(0)", opacity: 1 },
          "90%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(180px)", opacity: 0 },
        },
      },
      animation: {
        flash: "flashFade 7.0s forwards",
      },
    },
  },
  content: [
    './app/views/**/*.html.erb',
    './app/views/**/*.html.slim',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js',
    './app/javascript/**/*.jsx'
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'garden': {
          'primary' : '#76A284',
          // 'primary' : '#5a7c65',
          'primary-focus' : '#48604f',
          'primary-content' : '#ffffff',

          'secondary' : '#ecf4e7',
          'secondary-focus' : '#cde2c1',
          'secondary-content' : '#24321a',

          'accent' : '#f9e1e1',
          'accent-focus' : '#f4bebe',
          'accent-content' : '#322020',

          'neutral' : '#5c5757',
          'neutral-focus' : '#272525',
          'neutral-content' : '#e9e7e7',

          'base-100' : '#f5f5f5',
          'base-200' : '#d1cccc',
          'base-300' : '#b9b1b1',
          'base-content' : '#100f0f',

          'info' : '#7cc0f8',
          'success' : '#00c7b3',
          'warning' : '#ffad33',
          'error' : '#ff5724',
          // 'error' : '#e65023',

          '--rounded-box': '.5rem',          
          '--rounded-btn': '.5rem',        
          '--rounded-badge': '1.9rem',      

          '--animation-btn': '.25s',       
          '--animation-input': '.2s',       

          '--btn-text-case': 'uppercase',   
          '--navbar-padding': '.5rem',      
          '--border-btn': '1px',            
        },
      },
    ]
  }
});
