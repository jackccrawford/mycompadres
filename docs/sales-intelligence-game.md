# Sales Intelligence Game Documentation

## Overview

The Sales Intelligence Game is an engaging, ultra-minimalist game designed to simulate the strategic decision-making process in sales lead management. Players must strategically unlock contacts with limited credits while managing time constraints, making decisions about which contacts to prioritize based on their potential value.

## Game Mechanics

### Core Gameplay

1. **Objective**: Score as many points as possible by unlocking valuable contacts before time runs out or credits are depleted.

2. **Resources**:
   - **Credits**: Players start with 50 credits
   - **Time**: 60-second countdown timer
   - **Contacts**: A randomized set of contacts with varying unlock costs and values

3. **Actions**:
   - **Unlock Contact**: Spend credits to reveal a contact's information and gain points
   - **Lock Contact**: Lock a previously unlocked contact to recover 60% of the original cost
   - **Restart Game**: Begin a new game with shuffled contacts and reset resources

4. **Game End Conditions**:
   - Time runs out (60 seconds)
   - No more moves possible (insufficient credits to unlock any remaining contacts, even after considering potential credit recovery from locking)

### Scoring System

- Points are awarded based on the value of unlocked contacts:
  - Low-value contacts: 5 points
  - Medium-value contacts: 10 points
  - High-value contacts: 15 points

### Strategic Elements

1. **Resource Management**: Players must balance spending credits on new contacts versus saving them for potentially more valuable contacts.

2. **Risk vs. Reward**: Higher-value contacts cost more to unlock but provide greater point rewards.

3. **Credit Recovery**: Players can lock previously unlocked contacts to recover 60% of the original cost, creating a strategic element of sacrificing certain contacts to unlock others.

4. **Time Pressure**: The 60-second timer forces quick decision-making and creates tension.

5. **Progress Tracking**: A progress bar shows the percentage of unlocked contacts, helping players gauge their performance.

## User Interface Components

### Main Game Screen

- **Contact Cards**: Displays contact information (or hidden information for locked contacts)
- **Resource Display**: Shows current credits and remaining time
- **Progress Bar**: Indicates percentage of unlocked contacts
- **Action Buttons**: Unlock/Lock buttons for each contact

### Game Over Dialog

- **Result Summary**: Shows final score, remaining credits, and number of unlocked contacts
- **High-Value Leads**: Displays the number of high-value contacts unlocked
- **Action Buttons**: Options to play again or share results

### Share Functionality

- **Cross-Platform Sharing**:
  - **Mobile**: Uses native Share API
  - **Web**: Custom share modal with social media options (Twitter, Facebook, LinkedIn, Email) and copy-to-clipboard functionality

## Implementation Details

### State Management

The game maintains several key state variables:
- `contacts`: Array of contact objects with properties like id, name, title, company, value, cost, and unlock status
- `credits`: Current credit balance
- `remainingTime`: Seconds remaining in the game
- `gameActive`: Boolean indicating if the game is in progress
- `score`: Current point total
- `animations`: Object mapping contact IDs to animation values for visual feedback

### Key Functions

1. **startGame()**: Initializes game state, shuffles contacts, and starts the timer
2. **prepareContacts()**: Shuffles the contact array to ensure a different experience each game
3. **unlockContact()**: Handles the logic for unlocking a contact and updating the score
4. **lockContact()**: Handles the logic for locking a contact and recovering credits
5. **checkGameOver()**: Determines if the game should end due to insufficient moves
6. **shareResults()**: Handles cross-platform sharing of game results

### Visual Feedback

- **Animations**: Card flip animations when unlocking contacts
- **Color Coding**: Contacts are color-coded based on their value (low, medium, high)
- **Vibration**: Haptic feedback on mobile devices when unlocking contacts

## Technical Implementation

### Technologies Used

- **React Native**: Core framework for cross-platform development
- **React Native Paper**: UI component library for Material Design elements
- **React Native Feather**: Icon library
- **AsyncStorage**: For potential future implementation of saving high scores
- **Platform API**: For detecting platform (web vs. mobile) for sharing functionality

### Cross-Platform Considerations

1. **Responsive Design**: UI adapts to different screen sizes and orientations
2. **Platform-Specific Sharing**: 
   - Native Share API on mobile platforms
   - Custom WebShareModal component on web platforms
3. **Theme Support**: Respects system light/dark mode preferences

## Future Enhancements

Potential areas for future development:

1. **Difficulty Levels**: Easy, Medium, Hard modes with different starting credits and time limits
2. **Persistent High Scores**: Local or global leaderboards
3. **Additional Game Modes**: Time Attack, Endless Mode, Daily Challenge
4. **Enhanced Animations**: More sophisticated visual feedback
5. **Sound Effects**: Audio feedback for game actions
6. **Tutorial Mode**: Guided introduction for new players
7. **Accessibility Improvements**: Enhanced support for screen readers and other assistive technologies

## Code Structure

The game is primarily implemented in:
- `SalesIntelligenceScreen.tsx`: Main game component with core logic and UI
- `WebShareModal.tsx`: Component for web-specific sharing functionality
- `sampleContacts.ts`: Data structure and sample contacts

## Conclusion

The Sales Intelligence Game provides an engaging, strategic experience that simulates real-world sales decision-making in an ultra-minimalist format. Its simple yet challenging gameplay, combined with cross-platform compatibility, makes it accessible to a wide audience while maintaining depth of strategic choices.
