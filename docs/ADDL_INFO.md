# mVara Website RWA Documentation

Welcome to the mVara Website RWA documentation. This comprehensive guide provides detailed information about the application's architecture, components, and development practices.

## Documentation Index

### Getting Started
- [Onboarding Guide](./ONBOARDING.md) - Essential information for new developers
- [Architecture Overview](./ARCHITECTURE.md) - High-level architecture and design patterns

### Core Systems
- [Theme System](./THEME_SYSTEM.md) - Detailed documentation of the theme implementation
- [Component Library](./COMPONENTS.md) - Key components and their behavior
- [Navigation Architecture](./NAVIGATION_ARCHITECTURE.md) - Separation of header and navigation concerns

### Development Guides
- [Markdown Style Guide](./guides/markdown-style-guide.md) - Guidelines for writing documentation
- [Mermaid Style Guide](./guides/mermaid-style-guide.md) - Guidelines for creating diagrams

### Special Features
- [Sales Intelligence Game](./sales-intelligence-game.md) - Documentation for the Sales Intelligence feature

## Core Development Principles

### Code is Truth

The running, working code is the ultimate source of truth in our system. When documentation and code conflict, trust the code and update the documentation to match reality.

### Thorough Explanation Before Implementation

We value thorough explanation of options and trade-offs before implementation. This ensures that all stakeholders understand the implications of technical decisions and can make informed choices.

### User Experience Priorities

#### Media Handling

All media elements in the application follow these principles:
- No autoplay for videos or audio
- Clear play controls for user opt-in
- No default muting of videos
- Non-disruptive user experience

#### Platform Consistency

The application maintains a consistent experience across platforms while respecting platform-specific conventions and capabilities.

## Development Workflow

### Setup and Installation

```bash
# Clone the repository
git clone https://github.com/jackccrawford/mvara-website-rwa.git

# Install dependencies
cd mvara-website-rwa
npm install

# Start the development server
npx expo start --clear
```

### Key Commands

- `npx expo start` - Start the development server
- `npm run lint` - Run linting checks
- `npm run test` - Run tests
- `npm run build:web` - Build the web version

## Contributing to Documentation

We encourage all team members to contribute to the documentation. When adding or updating documentation:

1. Follow the [Markdown Style Guide](./guides/markdown-style-guide.md)
2. Focus on documenting actual behavior, not theoretical specifications
3. Include code examples where appropriate
4. Update the documentation when code changes

## Getting Help

If you have questions or need assistance:

- Review the existing documentation
- Check the codebase for examples
- Reach out to the team on Discord
- Create an issue on GitHub

## TODO and Future Improvements

The following items are planned for future documentation improvements:

1. **Component Diagrams** - Add visual diagrams showing component relationships
2. **API Documentation** - Document external API integrations when implemented
3. **Performance Guidelines** - Add specific performance optimization techniques
4. **Testing Strategy** - Document the testing approach and best practices
5. **Accessibility Checklist** - Create a comprehensive accessibility guide

If you'd like to contribute to any of these areas, please reach out to the team.
