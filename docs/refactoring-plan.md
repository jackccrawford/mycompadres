# mVara Website Refactoring Plan

## Original Refactoring Plan

### Step 1: Update Navigation Constants ✅ (COMPLETED)
- ✅ Change TAB_NAMES to the generic TAB structure
- ✅ Update TAB_HEADERS to match
- ✅ Keep all existing functionality working

### Step 2: Refactor Tab Screen Components (IN PROGRESS)
- [ ] Rename screen components to match the generic structure
- [ ] Move content from HomeScreen to appropriate tab screens
- [ ] Ensure navigation still works correctly

### Step 3: Update Navigation References (PENDING)
- [ ] Update any navigation logic that references specific tab names
- [ ] Test navigation between screens

### Step 4: Refactor Easter Egg (PENDING)
- [ ] Convert SalesIntelligenceScreen to a modal
- [ ] Update the trigger mechanism

### Step 5: Refactor Partnership Content (PARTIALLY COMPLETED)
- ✅ Added custom back button to Windsurf Partnership screen
- ✅ Implemented event-based navigation
- [ ] Integrate partnership content into appropriate tabs
- [ ] Remove the dedicated partnership screen

## Implementation Details

### Completed Work

1. ✅ **Tab Navigation Structure**
   - ✅ Refactored to use a generic structure with exactly five tabs
   - ✅ Renamed tabs to align with executive-focused strategy:
     - Home (Tab 0)
     - Wins (formerly Strategic Impact) (Tab 1)
     - Edge (formerly Competitive Edge) (Tab 2) - Now using a Rocket icon
     - Blueprint (formerly Implementation Reality) (Tab 3)
     - Insights (formerly About) (Tab 4)
   - ✅ Implemented backward compatibility with TAB_NAMES

2. ✅ **Icon Updates**
   - ✅ Changed Edge tab icon from BookOpen to Rocket

3. ✅ **Easter Egg Functionality**
   - ✅ Ensured accessibility via double-tap on logo
   - [ ] Convert to modal (pending)

4. ✅ **Windsurf Button Navigation**
   - ✅ Implemented event-based navigation to Windsurf Partnership screen
   - ✅ Added test modal for confirmation
   - ✅ Added custom back button matching Easter egg style
   - [ ] Integrate content into appropriate tabs (pending)

5. ✅ **Documentation**
   - ✅ Created hidden screen navigation implementation guide
   - ✅ Created and updated refactoring plan

## Next Steps

### Step 2: Refactor Tab Screen Components (NEXT PRIORITY)
- [ ] Create new screen components with generic names:
  - [ ] Create `Tab0Screen.tsx` (replacing HomeScreen)
  - [ ] Create `Tab1Screen.tsx` (replacing StrategicImpactScreen)
  - [ ] Create `Tab2Screen.tsx` (replacing CompetitiveEdgeScreen)
  - [ ] Create `Tab3Screen.tsx` (replacing ImplementationRealityScreen)
  - [ ] Create `Tab4Screen.tsx` (replacing SettingsScreen)
- [ ] Update imports in ThemedNavigator.tsx
- [ ] Gradually migrate content from old screens to new ones
- [ ] Ensure navigation still works correctly

### Step 3: Update Navigation References
- [ ] Update any navigation logic that references specific tab names
- [ ] Test navigation between screens
- [ ] Update deep links if applicable

### Step 4: Refactor Easter Egg
- [ ] Convert SalesIntelligenceScreen to a modal
- [ ] Update the trigger mechanism
- [ ] Test functionality

### Step 5: Refactor Partnership Content
- [ ] Integrate partnership content into appropriate tabs
- [ ] Remove the dedicated partnership screen
- [ ] Update navigation logic

## Guiding Principles

Throughout the refactoring process, adhere to these principles:

1. **Code is Truth**: Trust working code over documentation or specifications
2. **Maintain Working Systems**: Never break working functionality
3. **Incremental Changes**: Make small, testable changes rather than large rewrites
4. **Consistent Patterns**: Maintain consistent patterns across the codebase
5. **Executive Focus**: Ensure all changes support the executive-focused strategy
