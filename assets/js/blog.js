document.addEventListener('DOMContentLoaded', function() {
    // Sample blog data - in a real application, this would come from a database or API
    const blogPosts = [
        {
            id: 1,
            title: "How to Build a Responsive Website with Bootstrap 5",
            excerpt: "Learn how to leverage Bootstrap 5's powerful grid system and components to create a fully responsive website that looks great on all devices.",
            content: `<p>Bootstrap 5 is the latest version of the world's most popular CSS framework. It provides a robust set of tools for building responsive websites quickly and efficiently.</p>
                    <h2>Getting Started with Bootstrap 5</h2>
                    <p>To get started with Bootstrap 5, you need to include the Bootstrap CSS and JS files in your HTML document:</p>
                    <pre>&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"&gt;&lt;/script&gt;</pre>
                    <h2>The Bootstrap Grid System</h2>
                    <p>The Bootstrap grid system is based on a 12-column layout and is fully responsive. Here's an example of creating a two-column layout:</p>
                    <pre>&lt;div class="container"&gt;
  &lt;div class="row"&gt;
    &lt;div class="col-md-6"&gt;Left Column&lt;/div&gt;
    &lt;div class="col-md-6"&gt;Right Column&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
                    <p>This layout will automatically stack on mobile devices, providing a great user experience across all screen sizes.</p>
                    
                    <h2>Responsive Breakpoints in Bootstrap 5</h2>
                    <p>Bootstrap 5 offers six responsive breakpoints that you can use to customize your layouts based on different screen sizes:</p>
                    <ul>
                        <li><strong>xs</strong> - Extra small (< 576px) - Default, no prefix needed</li>
                        <li><strong>sm</strong> - Small (≥ 576px) - <code>col-sm-*</code></li>
                        <li><strong>md</strong> - Medium (≥ 768px) - <code>col-md-*</code></li>
                        <li><strong>lg</strong> - Large (≥ 992px) - <code>col-lg-*</code></li>
                        <li><strong>xl</strong> - Extra large (≥ 1200px) - <code>col-xl-*</code></li>
                        <li><strong>xxl</strong> - Extra extra large (≥ 1400px) - <code>col-xxl-*</code></li>
                    </ul>
                    <p>Using these breakpoints allows you to create truly responsive designs that adapt perfectly to any screen size:</p>
                    <pre>&lt;div class="row"&gt;
  &lt;div class="col-12 col-sm-6 col-md-4 col-lg-3"&gt;
    This column will take full width on mobile, half width on small screens,
    one-third on medium screens, and one-quarter on large screens.
  &lt;/div&gt;
&lt;/div&gt;</pre>

                    <h2>Bootstrap 5's Major Improvements</h2>
                    <p>Bootstrap 5 brings several significant improvements over previous versions:</p>
                    <ul>
                        <li><strong>No jQuery Dependency:</strong> Bootstrap 5 has dropped jQuery in favor of vanilla JavaScript, making it lighter and faster</li>
                        <li><strong>Improved Grid System:</strong> With the new gutter classes and enhanced responsive capabilities</li>
                        <li><strong>CSS Custom Properties:</strong> Bootstrap 5 uses CSS variables for easier theming</li>
                        <li><strong>Enhanced Form Elements:</strong> Redesigned form controls with better customization options</li>
                        <li><strong>RTL Support:</strong> Built-in Right-to-Left text direction support</li>
                        <li><strong>Utilities API:</strong> Create your own utility classes using the Utilities API</li>
                    </ul>
                    
                    <h2>Key Components in Bootstrap 5</h2>
                    <p>Bootstrap includes dozens of reusable components that you can drop into your projects:</p>
                    
                    <h3>Navigation</h3>
                    <p>Create responsive navigation bars with dropdown menus:</p>
                    <pre>&lt;nav class="navbar navbar-expand-lg navbar-light bg-light"&gt;
  &lt;div class="container"&gt;
    &lt;a class="navbar-brand" href="#"&gt;Brand&lt;/a&gt;
    &lt;button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"&gt;
      &lt;span class="navbar-toggler-icon"&gt;&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="collapse navbar-collapse" id="navbarNav"&gt;
      &lt;ul class="navbar-nav ms-auto"&gt;
        &lt;li class="nav-item"&gt;
          &lt;a class="nav-link active" href="#"&gt;Home&lt;/a&gt;
        &lt;/li&gt;
        &lt;li class="nav-item dropdown"&gt;
          &lt;a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" 
             role="button" data-bs-toggle="dropdown" aria-expanded="false"&gt;
            Services
          &lt;/a&gt;
          &lt;ul class="dropdown-menu" aria-labelledby="navbarDropdown"&gt;
            &lt;li&gt;&lt;a class="dropdown-item" href="#"&gt;Web Design&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a class="dropdown-item" href="#"&gt;Development&lt;/a&gt;&lt;/li&gt;
          &lt;/ul&gt;
        &lt;/li&gt;
        &lt;li class="nav-item"&gt;
          &lt;a class="nav-link" href="#"&gt;About&lt;/a&gt;
        &lt;/li&gt;
        &lt;li class="nav-item"&gt;
          &lt;a class="nav-link" href="#"&gt;Contact&lt;/a&gt;
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/nav&gt;</pre>

                    <h3>Cards</h3>
                    <p>Cards are versatile containers for displaying content:</p>
                    <pre>&lt;div class="card"&gt;
  &lt;img src="image.jpg" class="card-img-top" alt="..."&gt;
  &lt;div class="card-body"&gt;
    &lt;h5 class="card-title"&gt;Card title&lt;/h5&gt;
    &lt;p class="card-text"&gt;Some quick example text to build on the card.&lt;/p&gt;
    &lt;a href="#" class="btn btn-primary"&gt;Go somewhere&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
                    
                    <h3>Modals</h3>
                    <p>Create interactive modal dialogs:</p>
                    <pre>&lt;!-- Button trigger modal --&gt;
&lt;button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"&gt;
  Launch demo modal
&lt;/button&gt;

&lt;!-- Modal --&gt;
&lt;div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"&gt;
  &lt;div class="modal-dialog"&gt;
    &lt;div class="modal-content"&gt;
      &lt;div class="modal-header"&gt;
        &lt;h5 class="modal-title" id="exampleModalLabel"&gt;Modal title&lt;/h5&gt;
        &lt;button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"&gt;&lt;/button&gt;
      &lt;/div&gt;
      &lt;div class="modal-body"&gt;
        Modal content goes here...
      &lt;/div&gt;
      &lt;div class="modal-footer"&gt;
        &lt;button type="button" class="btn btn-secondary" data-bs-dismiss="modal"&gt;Close&lt;/button&gt;
        &lt;button type="button" class="btn btn-primary"&gt;Save changes&lt;/button&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>

                    <h3>Forms</h3>
                    <p>Bootstrap 5 introduces new form controls and layouts:</p>
                    <pre>&lt;form class="row g-3 needs-validation" novalidate&gt;
  &lt;div class="col-md-6"&gt;
    &lt;label for="validationCustom01" class="form-label"&gt;First name&lt;/label&gt;
    &lt;input type="text" class="form-control" id="validationCustom01" required&gt;
    &lt;div class="valid-feedback"&gt;
      Looks good!
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="col-md-6"&gt;
    &lt;label for="validationCustom02" class="form-label"&gt;Last name&lt;/label&gt;
    &lt;input type="text" class="form-control" id="validationCustom02" required&gt;
    &lt;div class="invalid-feedback"&gt;
      Please provide a last name.
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="col-12"&gt;
    &lt;div class="form-check"&gt;
      &lt;input class="form-check-input" type="checkbox" id="invalidCheck" required&gt;
      &lt;label class="form-check-label" for="invalidCheck"&gt;
        Agree to terms and conditions
      &lt;/label&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="col-12"&gt;
    &lt;button class="btn btn-primary" type="submit"&gt;Submit form&lt;/button&gt;
  &lt;/div&gt;
&lt;/form&gt;</pre>

                    <h2>Bootstrap Utility Classes</h2>
                    <p>Bootstrap 5 includes an extensive set of utility classes that help you style elements without writing custom CSS:</p>
                    <ul>
                        <li><strong>Spacing:</strong> <code>m-*</code> (margin), <code>p-*</code> (padding)</li>
                        <li><strong>Borders:</strong> <code>border</code>, <code>border-*</code>, <code>rounded-*</code></li>
                        <li><strong>Colors:</strong> <code>text-*</code>, <code>bg-*</code></li>
                        <li><strong>Flex:</strong> <code>d-flex</code>, <code>flex-*</code>, <code>justify-content-*</code></li>
                        <li><strong>Display:</strong> <code>d-none</code>, <code>d-block</code>, <code>d-md-none</code></li>
                        <li><strong>Position:</strong> <code>position-relative</code>, <code>position-absolute</code></li>
                    </ul>
                    <p>These utility classes enable rapid development by allowing you to apply styling directly in your HTML:</p>
                    <pre>&lt;div class="bg-primary text-white p-4 mb-3 rounded shadow"&gt;
  This div has a blue background, white text, ample padding,
  margin at the bottom, rounded corners, and a shadow effect.
&lt;/div&gt;</pre>

                    <h2>Customizing Bootstrap with Sass</h2>
                    <p>One of Bootstrap's strengths is its customizability. You can customize Bootstrap to match your brand's colors and style:</p>
                    <pre>// Create a custom.scss file with your variable overrides
$primary: #0074d9;
$secondary: #6c757d;
$success: #28a745;
$border-radius: 0.5rem;
$enable-shadows: true;

// Then import Bootstrap
@import "bootstrap/scss/bootstrap";</pre>
                    
                    <p>This approach allows you to create a custom build of Bootstrap with only the components you need, reducing the final file size of your CSS.</p>

                    <h2>Bootstrap Icons</h2>
                    <p>Bootstrap 5 comes with its own icon library with over 1,600 icons:</p>
                    <pre>&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"&gt;

&lt;i class="bi bi-star-fill text-warning"&gt;&lt;/i&gt;
&lt;i class="bi bi-heart text-danger"&gt;&lt;/i&gt;
&lt;i class="bi bi-alarm"&gt;&lt;/i&gt;</pre>

                    <h2>Performance Optimization</h2>
                    <p>To optimize performance when using Bootstrap:</p>
                    <ul>
                        <li>Only include the components you actually need</li>
                        <li>Consider lazy-loading offscreen content</li>
                        <li>Minimize the use of jQuery plugins if you've added jQuery back to your project</li>
                        <li>Use the minified versions of CSS and JS in production</li>
                        <li>Consider using a CDN for faster loading</li>
                    </ul>

                    <h2>Common Bootstrap 5 Patterns</h2>
                    <p>Here are some common patterns you can create with Bootstrap 5:</p>
                    
                    <h3>Hero Section</h3>
                    <pre>&lt;div class="bg-dark text-white p-5 mb-4 rounded"&gt;
  &lt;div class="container py-5"&gt;
    &lt;h1 class="display-3 fw-bold"&gt;Welcome to My Website&lt;/h1&gt;
    &lt;p class="col-md-8 fs-4"&gt;Using Bootstrap 5, you can create stunning websites quickly and efficiently.&lt;/p&gt;
    &lt;a class="btn btn-primary btn-lg" href="#"&gt;Learn more&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
                    
                    <h3>Feature Cards</h3>
                    <pre>&lt;div class="container"&gt;
  &lt;div class="row g-4"&gt;
    &lt;div class="col-md-4"&gt;
      &lt;div class="card h-100 shadow-sm"&gt;
        &lt;div class="card-body"&gt;
          &lt;div class="feature-icon bg-primary bg-gradient text-white rounded-3 mb-3"&gt;
            &lt;i class="bi bi-collection"&gt;&lt;/i&gt;
          &lt;/div&gt;
          &lt;h2&gt;Featured title&lt;/h2&gt;
          &lt;p&gt;Paragraph of text describing this feature.&lt;/p&gt;
          &lt;a href="#" class="btn btn-outline-primary"&gt;Learn more&lt;/a&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;!-- More feature cards... --&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>

                    <h2>Conclusion</h2>
                    <p>Bootstrap 5 offers a comprehensive framework for building responsive, mobile-first websites. By mastering its grid system, components, and utility classes, you can dramatically speed up your development process while ensuring your websites look great on all devices.</p>
                    
                    <p>The removal of jQuery dependency, improved grid system, and enhanced customization options make Bootstrap 5 lighter and more powerful than ever. Whether you're building a small personal website or a large enterprise application, Bootstrap 5 provides the tools you need to create professional, responsive interfaces quickly.</p>
                    
                    <p>To learn more, visit the <a href="https://getbootstrap.com/docs/5.1/getting-started/introduction/" target="_blank">official Bootstrap 5 documentation</a>.</p>`,
            image: "./assets/images/blog/post1.jpg",
            category: "web-development",
            date: "May 15, 2023",
            author: "Rovi Fauzan",
            readTime: "8 min read",
            tags: ["bootstrap", "responsive", "web development", "html", "css"]
        },
        {
            id: 2,
            title: "10 UI/UX Design Principles Every Developer Should Know",
            excerpt: "Discover the essential UI/UX design principles that will help you create more user-friendly and visually appealing web applications.",
            content: `<p>As developers, understanding UI/UX design principles can significantly improve the quality of your applications. Here are 10 essential principles to keep in mind:</p>
                    <h2>1. Know Your Users</h2>
                    <p>Understanding who will use your application is fundamental. Create user personas and design with their needs in mind.</p>
                    <p>A user persona is a semi-fictional representation of your ideal user based on research and data. For example:</p>
                    <blockquote>
                        <strong>Marketing Manager Maria:</strong> 32 years old, works at a mid-sized company, uses various digital tools throughout the day, values efficiency and clear information, often multitasks between several applications, and has limited time to learn new interfaces.
                    </blockquote>
                    <p>By designing with specific personas like Maria in mind, you ensure your application addresses real user needs rather than assumptions. Consider conducting user interviews, surveys, and analyzing user data to develop accurate personas.</p>
                    
                    <h2>2. Visual Hierarchy</h2>
                    <p>Guide users through your interface by establishing a clear visual hierarchy. Use size, color, and placement to indicate importance.</p>
                    <p>Visual hierarchy determines the order in which users process information and helps them navigate your interface intuitively. Key techniques include:</p>
                    <ul>
                        <li><strong>Size variation:</strong> Larger elements attract more attention than smaller ones</li>
                        <li><strong>Color and contrast:</strong> Bright or contrasting colors stand out from the surrounding elements</li>
                        <li><strong>Spacing:</strong> Strategic whitespace draws attention to important elements</li>
                        <li><strong>Positioning:</strong> Elements placed at the top of the page typically receive more attention</li>
                        <li><strong>Typography:</strong> Different font styles, weights, and sizes establish information hierarchy</li>
                    </ul>
                    <p>For example, on an e-commerce product page, the product name might use a large heading, the price could be in a contrasting color, while less critical information like shipping details uses smaller text.</p>
                    
                    <h2>3. Consistency</h2>
                    <p>Maintain consistency in your design language. Use the same patterns, colors, and interactions throughout your application.</p>
                    <p>Consistency builds familiarity and reduces cognitive load. When users learn something once, they expect it to work the same way throughout your application. This applies to:</p>
                    <ul>
                        <li><strong>Visual consistency:</strong> Colors, typography, button styles, and icons</li>
                        <li><strong>Functional consistency:</strong> Interactive elements that behave predictably</li>
                        <li><strong>Internal consistency:</strong> Following your own patterns throughout the application</li>
                        <li><strong>External consistency:</strong> Adhering to platform conventions and user expectations</li>
                    </ul>
                    <p>To maintain consistency, create and follow a design system or component library that documents your UI elements and interaction patterns.</p>
                    
                    <h2>4. Accessibility</h2>
                    <p>Design for all users, including those with disabilities. This isn't just ethical—it's often a legal requirement and expands your user base.</p>
                    <p>Key accessibility considerations include:</p>
                    <ul>
                        <li><strong>Color contrast:</strong> Ensure text is readable with at least a 4.5:1 contrast ratio for normal text (WCAG AA standard)</li>
                        <li><strong>Keyboard navigation:</strong> Make all functionality available without requiring a mouse</li>
                        <li><strong>Screen reader support:</strong> Use semantic HTML and ARIA attributes when necessary</li>
                        <li><strong>Text alternatives:</strong> Provide alt text for images and descriptions for non-text content</li>
                        <li><strong>Focus indicators:</strong> Make it clear which element is currently in focus</li>
                        <li><strong>Resizable text:</strong> Ensure the interface works when text is enlarged up to 200%</li>
                    </ul>
                    <p>Tools like the WAVE Web Accessibility Evaluation Tool, axe, and Lighthouse can help you identify accessibility issues in your application.</p>
                    
                    <h2>5. Feedback and Response Time</h2>
                    <p>Always provide feedback when users interact with your interface, and ensure your application responds quickly.</p>
                    <p>Feedback acknowledges user actions and builds confidence. Every interaction should provide some form of feedback:</p>
                    <ul>
                        <li><strong>Button state changes:</strong> Hover effects, active states, and focus indicators</li>
                        <li><strong>Form validation:</strong> Immediate feedback on input errors</li>
                        <li><strong>Loading indicators:</strong> Progress bars or spinners for operations taking more than 1 second</li>
                        <li><strong>Success/error messages:</strong> Clear confirmation when actions complete</li>
                        <li><strong>Animated transitions:</strong> Subtle animations that show context and relationship between states</li>
                    </ul>
                    <p>Regarding response times, Jakob Nielsen's research established these guidelines:</p>
                    <ul>
                        <li><strong>0.1 second:</strong> Feels instantaneous</li>
                        <li><strong>1 second:</strong> User flow remains uninterrupted</li>
                        <li><strong>10 seconds:</strong> Maximum time to keep user attention; provide feedback for longer operations</li>
                    </ul>
                    
                    <h2>6. Recognition over Recall</h2>
                    <p>Design interfaces that help users recognize options rather than having to remember them.</p>
                    <p>Human memory is fallible, so minimize the cognitive load on your users. Practical applications of this principle include:</p>
                    <ul>
                        <li><strong>Clear labeling:</strong> Use descriptive labels for navigation and controls</li>
                        <li><strong>Visible options:</strong> Show available functions rather than hiding them in deep menus</li>
                        <li><strong>Contextual help:</strong> Provide guidance within the interface where users need it</li>
                        <li><strong>Recently used items:</strong> Show lists of recent documents or actions</li>
                        <li><strong>Autocomplete:</strong> Suggest options based on partial input</li>
                        <li><strong>Memory aids:</strong> Use icons alongside text to create multiple memory cues</li>
                    </ul>
                    <p>For example, a dropdown menu with categorized options is easier to use than requiring users to recall and type specific commands.</p>
                    
                    <h2>7. Error Prevention and Recovery</h2>
                    <p>Design systems that prevent errors before they happen and provide clear paths to recovery when they do occur.</p>
                    <p>Error prevention is better than error correction. Implement these strategies:</p>
                    <ul>
                        <li><strong>Constraints:</strong> Limit options to prevent errors (e.g., date pickers instead of text fields)</li>
                        <li><strong>Defaults:</strong> Provide sensible default values</li>
                        <li><strong>Confirmations:</strong> Ask for verification before destructive actions</li>
                        <li><strong>Real-time validation:</strong> Check input as users type</li>
                        <li><strong>Forgiving formats:</strong> Accept multiple input formats (e.g., different date formats)</li>
                    </ul>
                    <p>When errors do occur:</p>
                    <ul>
                        <li><strong>Clear error messages:</strong> Explain what went wrong in plain language</li>
                        <li><strong>Constructive guidance:</strong> Tell users how to fix the problem</li>
                        <li><strong>Preserve user input:</strong> Don't clear forms when errors occur</li>
                        <li><strong>Undo functionality:</strong> Allow users to reverse actions</li>
                        <li><strong>Error recovery:</strong> Provide a clear path back to a working state</li>
                    </ul>
                    
                    <h2>8. Flexibility and Efficiency</h2>
                    <p>Create interfaces that work well for both novice and advanced users.</p>
                    <p>A well-designed interface grows with your users as they become more experienced. Consider implementing:</p>
                    <ul>
                        <li><strong>Progressive disclosure:</strong> Show basic functions by default, with advanced options available when needed</li>
                        <li><strong>Keyboard shortcuts:</strong> Provide accelerators for frequent actions</li>
                        <li><strong>Customization:</strong> Allow users to tailor the interface to their preferences</li>
                        <li><strong>History and favorites:</strong> Let users bookmark or quickly access frequently used items</li>
                        <li><strong>Smart defaults:</strong> Learn from user behavior to suggest likely actions</li>
                        <li><strong>Batch operations:</strong> Enable efficient handling of multiple items at once</li>
                    </ul>
                    <p>For example, a text editor might offer both a formatting toolbar for beginners and keyboard shortcuts for power users.</p>
                    
                    <h2>9. Aesthetic and Minimalist Design</h2>
                    <p>Keep interfaces simple and focused. Every extra element competes for the user's attention.</p>
                    <p>Minimalism isn't about making things plain—it's about intentionality. Apply these principles:</p>
                    <ul>
                        <li><strong>Focus on core functionality:</strong> Identify and emphasize the primary tasks</li>
                        <li><strong>Remove unnecessary elements:</strong> Question every component's purpose</li>
                        <li><strong>Visual clarity:</strong> Use clean layouts with sufficient whitespace</li>
                        <li><strong>Information hierarchy:</strong> Organize content from most to least important</li>
                        <li><strong>Progressive disclosure:</strong> Hide complexity until needed</li>
                        <li><strong>Purposeful aesthetics:</strong> Use visual design to enhance usability, not just for decoration</li>
                    </ul>
                    <p>Research shows that users perceive aesthetically pleasing interfaces as more usable, creating a positive first impression that increases engagement and satisfaction.</p>
                    
                    <h2>10. Test with Real Users</h2>
                    <p>No matter how good your design intuition is, there's no substitute for watching real users interact with your product.</p>
                    <p>User testing provides invaluable insights that no amount of expert review can replace. Consider these approaches:</p>
                    <ul>
                        <li><strong>Usability testing:</strong> Observe users completing specific tasks</li>
                        <li><strong>A/B testing:</strong> Compare different design solutions with real users</li>
                        <li><strong>Analytics:</strong> Track user behavior patterns and identify pain points</li>
                        <li><strong>Heatmaps:</strong> Visualize where users click, scroll, and focus attention</li>
                        <li><strong>User interviews:</strong> Gather qualitative feedback about the experience</li>
                        <li><strong>Surveys:</strong> Collect structured feedback at scale</li>
                    </ul>
                    <p>Testing doesn't need to be elaborate or expensive. Even testing with 5 users can identify most major usability issues. Start early with paper prototypes or wireframes and continue testing throughout development.</p>
                    
                    <h2>Implementing These Principles in Your Workflow</h2>
                    <p>Integrating these UI/UX principles into your development process takes practice. Here's a practical approach:</p>
                    <ol>
                        <li><strong>Start with research:</strong> Understand your users before designing anything</li>
                        <li><strong>Sketch and wireframe:</strong> Explore multiple solutions on paper or in low-fidelity</li>
                        <li><strong>Create a design system:</strong> Establish consistent patterns and components</li>
                        <li><strong>Prototype:</strong> Build interactive models to test functionality</li>
                        <li><strong>Test early and often:</strong> Get user feedback throughout the process</li>
                        <li><strong>Iterate:</strong> Refine based on feedback and data</li>
                        <li><strong>Document decisions:</strong> Record the reasoning behind design choices</li>
                    </ol>
                    <p>Remember that good UI/UX is iterative. Your first version will rarely be perfect, but by applying these principles and learning from users, you'll continuously improve your designs.</p>
                    
                    <h2>Conclusion</h2>
                    <p>UI/UX design isn't just about making things look pretty—it's about creating interfaces that are easy to use, efficient, and satisfying. By incorporating these 10 principles into your development process, you'll create applications that users love to use.</p>
                    
                    <p>As you apply these principles, remember that design decisions should be driven by user needs and business goals. The most beautiful interface is worthless if it doesn't help users accomplish their tasks efficiently.</p>
                    
                    <p>Start small by focusing on one or two principles at a time. As these become second nature, add more to your process. Over time, you'll develop an intuitive sense for good design that will elevate all your projects.</p>`,
            image: "./assets/images/blog/post2.jpg",
            category: "ui-design",
            date: "April 28, 2023",
            author: "Rovi Fauzan",
            readTime: "6 min read",
            tags: ["ui", "ux", "design", "web design"]
        },
        {
            id: 3,
            title: "JavaScript ES6 Features Every Developer Should Master",
            excerpt: "Explore the powerful features introduced in ES6 that have transformed how we write JavaScript code, with practical examples and tips.",
            content: `<p>ES6 (ECMAScript 2015) introduced many new features to JavaScript that have dramatically improved how we write code. Here are some key features every developer should master:</p>
                    <h2>Arrow Functions</h2>
                    <p>Arrow functions provide a more concise syntax for writing functions:</p>
                    <pre>// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;</pre>
                    <p>Arrow functions have several key differences from traditional functions:</p>
                    <ul>
                      <li><strong>Lexical 'this':</strong> Arrow functions don't have their own 'this' context. Instead, they inherit 'this' from the surrounding code.</li>
                      <li><strong>No 'arguments' object:</strong> You can't access the arguments object in an arrow function.</li>
                      <li><strong>Can't be used as constructors:</strong> Arrow functions can't be used with the 'new' keyword.</li>
                    </ul>

                    <p>A common use case for arrow functions is with array methods:</p>
                    <pre>// Traditional function
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(function(num) {
  return num * 2;
});

// Arrow function
const doubled = numbers.map(num => num * 2);</pre>

                    <p>The most significant benefit is how they handle the 'this' keyword:</p>
                    <pre>// Traditional function loses 'this' context
const counter = {
  count: 0,
  start: function() {
    setInterval(function() {
      this.count++; // 'this' refers to the window, not counter
      console.log(this.count); // NaN
    }, 1000);
  }
};

// Arrow function preserves 'this' context
const betterCounter = {
  count: 0,
  start: function() {
    setInterval(() => {
      this.count++; // 'this' refers to betterCounter
      console.log(this.count); // 1, 2, 3...
    }, 1000);
  }
};</pre>

                    <h2>Template Literals</h2>
                    <p>Template literals allow for easier string concatenation and multiline strings:</p>
                    <pre>const name = 'JavaScript';
const greeting = \`Hello, \${name}!\`;</pre>

                    <p>The benefits of template literals include:</p>
                    <ul>
                      <li>String interpolation with \${expression}</li>
                      <li>Multiline strings without special characters</li>
                      <li>Nested templates for complex string generation</li>
                    </ul>

                    <pre>// Multiline strings
const multiline = \`
  This is a multiline string.
  No special characters needed.
  It preserves indentation and line breaks.
\`;

// Complex interpolation
const price = 19.99;
const tax = 0.07;
const total = \`The total is $\${(price + (price * tax)).toFixed(2)}\`;

// Tagged templates for advanced string processing
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] || '';
    return \`\${result}\${str}<span class="highlight">\${value}</span>\`;
  }, '');
}

const language = 'JavaScript';
const highlighted = highlight\`I love \${language}!\`;
// Results in: "I love <span class="highlight">JavaScript</span>!"</pre>

                    <h2>Destructuring Assignment</h2>
                    <p>Destructuring allows you to extract values from arrays or properties from objects into distinct variables:</p>
                    
                    <h3>Array Destructuring</h3>
                    <pre>// Before ES6
const arr = [1, 2, 3];
const first = arr[0];
const second = arr[1];

// With ES6 destructuring
const [first, second, third] = [1, 2, 3];</pre>

                    <p>You can also use rest parameters to collect remaining elements:</p>
                    <pre>const [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]</pre>

                    <p>Or skip elements you're not interested in:</p>
                    <pre>const [first, , third] = [1, 2, 3];
console.log(first); // 1
console.log(third); // 3</pre>

                    <h3>Object Destructuring</h3>
                    <pre>// Before ES6
const person = { name: 'John', age: 30, city: 'New York' };
const name = person.name;
const age = person.age;

// With ES6 destructuring
const { name, age } = person;</pre>

                    <p>You can assign to different variable names:</p>
                    <pre>const { name: fullName, age: years } = person;
console.log(fullName); // 'John'
console.log(years); // 30</pre>

                    <p>Or use default values if a property doesn't exist:</p>
                    <pre>const { name, age, country = 'USA' } = person;
console.log(country); // 'USA' (default value)</pre>

                    <p>Destructuring is particularly useful in function parameters:</p>
                    <pre>// Before ES6
function displayPerson(person) {
  console.log(person.name + ' is ' + person.age + ' years old');
}

// With ES6 destructuring
function displayPerson({ name, age }) {
  console.log(\`\${name} is \${age} years old\`);
}

displayPerson(person);</pre>

                    <h2>Default Parameters</h2>
                    <p>ES6 allows you to set default values for function parameters:</p>
                    <pre>// Before ES6
function greet(name) {
  name = name || 'Guest';
  return 'Hello, ' + name + '!';
}

// With ES6 default parameters
function greet(name = 'Guest') {
  return \`Hello, \${name}!\`;
}

console.log(greet()); // 'Hello, Guest!'
console.log(greet('John')); // 'Hello, John!'</pre>

                    <p>Default parameters can be expressions or even function calls:</p>
                    <pre>function getDefaultName() {
  return 'Anonymous';
}

function greet(name = getDefaultName()) {
  return \`Hello, \${name}!\`;
}

// The default function is only called when needed
console.log(greet()); // 'Hello, Anonymous!'</pre>

                    <h2>Rest and Spread Operators</h2>
                    <p>The <code>...</code> syntax can be used in different contexts:</p>
                    
                    <h3>Rest Parameters</h3>
                    <p>Collect all remaining arguments into an array:</p>
                    <pre>function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10</pre>

                    <p>This provides a cleaner alternative to the arguments object:</p>
                    <pre>// Before ES6
function sum() {
  var numbers = Array.prototype.slice.call(arguments);
  return numbers.reduce(function(total, num) {
    return total + num;
  }, 0);
}

// With ES6 rest parameters
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}</pre>

                    <h3>Spread Operator</h3>
                    <p>Expand an array or object:</p>
                    <pre>// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

// Easy array copying
const original = [1, 2, 3];
const copy = [...original];

// Spread in function calls
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // 3</pre>

                    <p>Spread also works with objects (added in ES2018):</p>
                    <pre>const defaults = { theme: 'dark', fontSize: 16 };
const userPrefs = { fontSize: 14 };
const settings = { ...defaults, ...userPrefs };
// { theme: 'dark', fontSize: 14 }</pre>

                    <h2>Classes</h2>
                    <p>ES6 introduced class syntax to JavaScript, making object-oriented programming more intuitive:</p>
                    <pre>// Before ES6
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return 'Hello, I am ' + this.name;
};

// With ES6 classes
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, I am \${this.name}\`;
  }
}</pre>

                    <p>Classes also support inheritance:</p>
                    <pre>class Employee extends Person {
  constructor(name, age, position) {
    super(name, age); // Call parent constructor
    this.position = position;
  }
  
  greet() {
    return \`\${super.greet()} and I work as a \${this.position}\`;
  }
}

const employee = new Employee('Alice', 28, 'Developer');
console.log(employee.greet()); // 'Hello, I am Alice and I work as a Developer'</pre>

                    <h2>Modules</h2>
                    <p>ES6 introduced a standardized module system:</p>

                    <h3>Exporting</h3>
                    <pre>// Named exports
export const PI = 3.14159;
export function square(x) {
  return x * x;
}

// Default export
export default class Calculator {
  add(a, b) {
    return a + b;
  }
}</pre>

                    <h3>Importing</h3>
                    <pre>// Import named exports
import { PI, square } from './math.js';

// Import default export
import Calculator from './calculator.js';

// Import and rename
import { PI as pi, square as sq } from './math.js';

// Import everything
import * as math from './math.js';</pre>

                    <h2>Promises</h2>
                    <p>Promises provide a cleaner way to handle asynchronous operations:</p>
                    <pre>// Before ES6 (callback hell)
fetchData(function(data) {
  processData(data, function(processedData) {
    saveData(processedData, function() {
      console.log('Data saved!');
    }, function(error) {
      console.error('Save error:', error);
    });
  }, function(error) {
    console.error('Process error:', error);
  });
}, function(error) {
  console.error('Fetch error:', error);
});

// With ES6 promises
fetchData()
  .then(data => processData(data))
  .then(processedData => saveData(processedData))
  .then(() => console.log('Data saved!'))
  .catch(error => console.error('Error:', error));</pre>

                    <p>Creating a promise:</p>
                    <pre>const fetchData = () => {
  return new Promise((resolve, reject) => {
    // Asynchronous operation
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ id: 1, name: 'Data' });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
};</pre>

                    <p>Useful Promise methods:</p>
                    <pre>// Promise.all - wait for all promises to resolve
Promise.all([fetchUsers(), fetchProducts()])
  .then(([users, products]) => {
    // Both data sets are available here
  })
  .catch(error => {
    // If any promise fails, catch runs
  });

// Promise.race - use the first promise to settle
Promise.race([fetchFromAPI1(), fetchFromAPI2()])
  .then(result => {
    // Use whichever API responded first
  });</pre>

                    <h2>Let and Const</h2>
                    <p>ES6 introduced block-scoped variables with <code>let</code> and constants with <code>const</code>:</p>
                    <pre>// Before ES6 - var has function scope
function example() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 (still accessible)
}

// With ES6 - let has block scope
function example() {
  if (true) {
    let x = 10;
  }
  console.log(x); // ReferenceError: x is not defined
}</pre>

                    <p><code>const</code> prevents reassignment but doesn't make objects immutable:</p>
                    <pre>const PI = 3.14159;
PI = 3; // TypeError: Assignment to constant variable

// Objects assigned to const can still be modified
const person = { name: 'John' };
person.name = 'Jane'; // This works
person = { name: 'Jane' }; // This doesn't work</pre>

                    <p>Best practices:</p>
                    <ul>
                      <li>Use <code>const</code> by default</li>
                      <li>Use <code>let</code> when you need to reassign a variable</li>
                      <li>Avoid <code>var</code> in new code</li>
                    </ul>

                    <h2>Map and Set</h2>
                    <p>ES6 introduced new data structures:</p>
                    
                    <h3>Map</h3>
                    <p>A key-value collection that allows any type of key:</p>
                    <pre>// Creating a Map
const userRoles = new Map();

// Adding entries
userRoles.set('john', 'admin');
userRoles.set('jane', 'editor');
userRoles.set('bob', 'user');

// Getting values
console.log(userRoles.get('john')); // 'admin'

// Checking if a key exists
console.log(userRoles.has('jane')); // true

// Size
console.log(userRoles.size); // 3

// Deleting an entry
userRoles.delete('bob');

// Iterating
for (const [user, role] of userRoles) {
  console.log(\`\${user} is a \${role}\`);
}</pre>

                    <p>Maps are better than objects when keys are unknown until runtime, when all keys are the same type, or when you need to preserve insertion order.</p>

                    <h3>Set</h3>
                    <p>A collection of unique values:</p>
                    <pre>// Creating a Set
const uniqueNumbers = new Set([1, 2, 3, 3, 4, 4]);
console.log(uniqueNumbers); // Set(4) {1, 2, 3, 4}

// Adding values
uniqueNumbers.add(5);
uniqueNumbers.add(1); // Ignored (already exists)

// Checking if a value exists
console.log(uniqueNumbers.has(3)); // true

// Size
console.log(uniqueNumbers.size); // 5

// Deleting a value
uniqueNumbers.delete(4);

// Iterating
for (const num of uniqueNumbers) {
  console.log(num);
}</pre>

                    <p>A common use case for Set is removing duplicates from an array:</p>
                    <pre>const numbers = [1, 2, 3, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]</pre>

                    <h2>Conclusion</h2>
                    <p>ES6 modernized JavaScript with features that make code more readable, maintainable, and expressive. By mastering these features, you'll write cleaner code and improve your productivity as a developer.</p>

                    <p>While ES6 was a major update, JavaScript has continued to evolve with new features in subsequent versions. Once you've mastered ES6, explore features from ES2016 and beyond, such as async/await, object rest/spread properties, and optional chaining.</p>

                    <p>Remember that modern browsers support most ES6 features, but for older browsers, you might need to use a transpiler like Babel to convert your code to ES5-compatible JavaScript.</p>`,
            image: "./assets/images/blog/post3.jpg",
            category: "programming",
            date: "April 10, 2023",
            author: "Rovi Fauzan",
            readTime: "10 min read",
            tags: ["javascript", "es6", "programming", "web development"]
        },
        {
            id: 4,
            title: "Building RESTful APIs with Node.js and Express",
            excerpt: "A comprehensive guide to building scalable and efficient RESTful APIs using Node.js, Express, and best practices for API design.",
            content: `<p>RESTful APIs are the backbone of modern web applications. In this guide, we'll explore how to create robust APIs using Node.js and Express.</p>
                    <h2>Setting Up Your Environment</h2>
                    <p>First, let's set up our Node.js project:</p>
                    <pre>mkdir my-api
cd my-api
npm init -y
npm install express mongoose cors dotenv</pre>`,
            image: "./assets/images/blog/post4.jpg",
            category: "web-development",
            date: "March 22, 2023",
            author: "Rovi Fauzan",
            readTime: "12 min read",
            tags: ["node.js", "express", "api", "backend", "javascript"]
        },
        {
            id: 5,
            title: "The Future of Web Development: Trends to Watch in 2024",
            excerpt: "Stay ahead of the curve by exploring emerging technologies and methodologies that are shaping the future of web development.",
            content: `<p>The web development landscape is constantly evolving. Here are some key trends to watch in 2024 and beyond:</p>
                    <h2>1. WebAssembly (WASM)</h2>
                    <p>WebAssembly is revolutionizing web applications by allowing code written in languages like C, C++, and Rust to run in the browser at near-native speed.</p>
                    <h2>2. Serverless Architecture</h2>
                    <p>Serverless computing continues to gain popularity, allowing developers to build and run applications without managing server infrastructure.</p>`,
            image: "./assets/images/blog/post5.jpg",
            category: "technology",
            date: "March 5, 2023",
            author: "Rovi Fauzan",
            readTime: "9 min read",
            tags: ["trends", "future", "web development", "technology"]
        },
        {
            id: 6,
            title: "Mastering CSS Grid Layout: A Complete Guide",
            excerpt: "Learn how to create complex, responsive layouts with CSS Grid. This guide covers everything from basics to advanced techniques.",
            content: `<p>CSS Grid Layout is a two-dimensional layout system that revolutionizes how we create web layouts. Here's a comprehensive guide to mastering this powerful tool.</p>
                    <h2>CSS Grid Basics</h2>
                    <p>To create a grid container, use the display property:</p>
                    <pre>.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
  grid-gap: 20px; /* Spacing between grid items */
}</pre>`,
            image: "./assets/images/blog/post6.jpg",
            category: "web-development",
            date: "February 18, 2023",
            author: "Rovi Fauzan",
            readTime: "11 min read",
            tags: ["css", "grid", "layout", "responsive", "web development"]
        }
    ];
    
    // Make blog data globally available
    window.blogData = {
        posts: blogPosts,
        getPostById: (id) => blogPosts.find(post => post.id === parseInt(id)),
        getRecentPosts: (count = 3, excludeId = null) => {
            return blogPosts
                .filter(post => excludeId ? post.id !== parseInt(excludeId) : true)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, count);
        }
    };
    
    // Function to render blog posts with Bootstrap styling
    function renderBlogPosts(posts, page = 1, postsPerPage = 4) {
        const blogGrid = document.getElementById('blogGrid');
        if (!blogGrid) return;
        
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = posts.slice(startIndex, endIndex);
        
        blogGrid.innerHTML = '';
        
        if (paginatedPosts.length === 0) {
            // Bootstrap alert for no results
            blogGrid.innerHTML = '<div class="alert alert-info no-results">No blog posts found matching your search.</div>';
            return;
        }
        
        paginatedPosts.forEach(post => {
            // Create a Bootstrap card for each blog post
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card card h-100'; // Added Bootstrap card class
            
            blogCard.innerHTML = `
                <img src="${post.image}" alt="${post.title}" class="blog-card-img card-img-top">
                <div class="blog-card-content card-body"> <!-- Bootstrap card-body -->
                    <div class="blog-card-meta text-muted mb-2"> <!-- Bootstrap text-muted -->
                        <span><i class="far fa-calendar-alt"></i> ${post.date}</span>
                        <span><i class="far fa-clock"></i> ${post.readTime}</span>
                    </div>
                    <!-- Bootstrap badge for category -->
                    <span class="category badge ${post.category === 'web-development' ? 'bg-success' : 
                                              post.category === 'ui-design' ? 'bg-primary' : 
                                              post.category === 'programming' ? 'bg-warning' : 
                                              'bg-info'}">${formatCategory(post.category)}</span>
                    <h3 class="card-title mt-2">${post.title}</h3> <!-- Bootstrap card-title -->
                    <p class="card-text">${post.excerpt}</p> <!-- Bootstrap card-text -->
                    <!-- Bootstrap styled link -->
                    <a href="article.html?id=${post.id}" class="blog-card-link btn btn-outline-primary mt-2">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            
            blogGrid.appendChild(blogCard);
        });
        
        updatePagination(posts.length, page, postsPerPage);
    }
    
    // Format category name for display
    function formatCategory(category) {
        return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    
    // Update pagination buttons with Bootstrap styling
    function updatePagination(totalPosts, currentPage, postsPerPage) {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;
        
        const totalPages = Math.ceil(totalPosts / postsPerPage);
        pagination.innerHTML = '';
        pagination.classList.add('pagination', 'justify-content-center'); // Bootstrap classes
        
        // Previous button with Bootstrap styling
        if (totalPages > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = `page-btn prev page-item ${currentPage === 1 ? 'disabled' : ''}`; // Added Bootstrap page-item
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.disabled = currentPage === 1;
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    changePage(currentPage - 1);
                }
            });
            pagination.appendChild(prevBtn);
        }
        
        // Page numbers with Bootstrap styling
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''} page-link`; // Added Bootstrap page-link
            pageBtn.textContent = i;
            pageBtn.dataset.page = i;
            pageBtn.addEventListener('click', () => changePage(i));
            pagination.appendChild(pageBtn);
        }
        
        // Next button with Bootstrap styling
        if (totalPages > 1) {
            const nextBtn = document.createElement('button');
            nextBtn.className = `page-btn next page-item ${currentPage === totalPages ? 'disabled' : ''}`; // Added Bootstrap page-item
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    changePage(currentPage + 1);
                }
            });
            pagination.appendChild(nextBtn);
        }
    }

    // Filter blog posts by category
    function filterByCategory(category) {
        if (category === 'all') {
            return blogPosts;
        }
        return blogPosts.filter(post => post.category === category);
    }
    
    // Search blog posts
    function searchPosts(query) {
        query = query.toLowerCase();
        return blogPosts.filter(post => 
            post.title.toLowerCase().includes(query) || 
            post.excerpt.toLowerCase().includes(query) || 
            post.category.toLowerCase().includes(query) ||
            post.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
    
    // Change page function for pagination
    function changePage(page) {
        currentPage = page;
        
        // Get current filter state
        const categoryFilter = document.getElementById('categoryFilter');
        const searchInput = document.getElementById('searchInput');
        let posts = blogPosts;
        
        if (categoryFilter && categoryFilter.value !== 'all') {
            posts = filterByCategory(categoryFilter.value);
        }
        
        if (searchInput && searchInput.value.trim().length > 2) {
            posts = searchPosts(searchInput.value.trim());
        }
        
        renderBlogPosts(posts, page);
        
        // Scroll to top of blog section
        const blogSection = document.querySelector('.articles');
        if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Set up event listeners for filters
    function setupEventListeners() {
        const categoryFilter = document.getElementById('categoryFilter');
        const searchInput = document.getElementById('searchInput');
        const searchButton = searchInput ? searchInput.nextElementSibling : null;
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', function() {
                const category = this.value;
                const filteredPosts = filterByCategory(category);
                renderBlogPosts(filteredPosts, 1);
            });
        }
        
        if (searchInput) {
            // Debounce function to prevent excessive filtering while typing
            let debounceTimer;
            searchInput.addEventListener('input', function() {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    const query = this.value.trim();
                    if (query.length > 2) {
                        const searchResults = searchPosts(query);
                        renderBlogPosts(searchResults, 1);
                    } else if (query.length === 0) {
                        // Reset to all posts if search field is cleared
                        const category = categoryFilter ? categoryFilter.value : 'all';
                        const filteredPosts = filterByCategory(category);
                        renderBlogPosts(filteredPosts, 1);
                    }
                }, 300);
            });
            
            // Search button click
            if (searchButton) {
                searchButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const query = searchInput.value.trim();
                    if (query.length > 0) {
                        const searchResults = searchPosts(query);
                        renderBlogPosts(searchResults, 1);
                    }
                });
            }
        }
        
        // Handle URL parameters for filtering
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const tagParam = urlParams.get('tag');
        
        if (categoryParam && categoryFilter) {
            categoryFilter.value = categoryParam;
            const filteredPosts = filterByCategory(categoryParam);
            renderBlogPosts(filteredPosts, 1);
        } else if (tagParam) {
            const filteredPosts = blogPosts.filter(post => 
                post.tags.some(tag => tag.toLowerCase() === tagParam.toLowerCase())
            );
            renderBlogPosts(filteredPosts, 1);
            // Show tag filter indicator with Bootstrap styling
            showTagFilter(tagParam);
        } else {
            // Initial render of all blog posts
            renderBlogPosts(blogPosts, 1);
        }
    }
    
    // Tag filter indicator with Bootstrap styling
    function showTagFilter(tagParam) {
        const container = document.querySelector('.container');
        if (container) {
            const filterIndicator = document.createElement('div');
            // Using Bootstrap alert component
            filterIndicator.className = 'tag-filter-indicator alert alert-primary d-flex justify-content-between align-items-center';
            filterIndicator.innerHTML = `
                <p class="m-0">Showing posts tagged with: <span class="tag-name badge bg-secondary">${tagParam}</span></p>
                <a href="blog.html" class="clear-filter btn btn-sm btn-outline-primary">Clear filter</a>
            `;
            container.insertBefore(filterIndicator, document.querySelector('.blog-grid'));
        }
    }
    
    // Initialize blog features
    setupEventListeners();
    
    // Add animation to blog cards for better visual appearance
    function animateBlogCards() {
        const blogCards = document.querySelectorAll('.blog-card');
        blogCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
    
    // Call animateBlogCards when the page is fully loaded
    window.addEventListener('load', animateBlogCards);
    
    // Observe for dynamically loaded cards
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                // Check if any of the added nodes are blog cards
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    const node = mutation.addedNodes[i];
                    if (node.classList && node.classList.contains('blog-card')) {
                        animateBlogCards();
                        break;
                    }
                }
            }
        });
    });
    
    // Start observing the blog grid
    const blogGrid = document.getElementById('blogGrid');
    if (blogGrid) {
        observer.observe(blogGrid, { childList: true });
    }
});
