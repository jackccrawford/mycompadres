# Call-To-Action (CTA) Buttons Table

| # | Status  | Label / Text                              | Action / Handler              | Screen / Component                | Purpose / Notes                                                        |
|---|---------|--------------------------------------------|-------------------------------|-----------------------------------|------------------------------------------------------------------------|
| 1 | TESTED  | Download Windsurf                         | handlePress (open URL)        | DownloadButton (component)        | Opens download link for Windsurf                                      |
| 2 | TESTED  | Toggle theme (icon button)                 | toggleTheme                   | ThemeToggle (component)           | Toggles light/dark/system theme                                       |
| 3 | TODO    | Email (replace with modern contact form)   | sendEmail                     | DownloadShareModal (component)    | Should open a modern contact form (reference: mvara@mvara.ai)          |
| 4 | TODO    | Message (replace with modern contact form) | sendSMS                       | DownloadShareModal (component)    | Should open a modern contact form (reference: mvara@mvara.ai)          |
| 5 | TODO    | X (icon button)                            | openShareUrl('x')             | WebShareModal (component)         | Shares via X (Twitter); launches https://x.com/mVaraAI in new window  |
| 6 | COMPLETE| Linkedin (icon button)                     | openShareUrl('linkedin')      | WebShareModal (component)         | Shares via LinkedIn; launches https://www.linkedin.com/company/mvara in new window (tested, works) |
| 7 | TODO    | Calculate Your Cost of Waiting             | (no explicit handler)         | CompetitiveEdgeScreen             | Requires content (brainstorm with user)                               |
| 8 | COMPLETE| Request Implementation Blueprint           | openShareUrl('x')             | WebShareModal (component)         | Shares via X; launches https://x.com/mvaraai in new window (tested, works) |
| 9 | COMPLETE| [Dynamic: Settings Items]                  | onPress (various)             | SettingsScreen (renderSettingsItem)| Dynamic settings actions implemented and functional                   |
|10 | ???     | [Dynamic: Palette Item]                    | setPaletteType(item.id)       | SettingsScreen (renderPaletteItem)| Uncertain; dynamic palette actions                                    |
|11 | ???     | [Dynamic: InteractiveCard]                 | onPress (various)             | InteractiveCard (component)       | Uncertain; varies by card usage                                       |

| Tab | CTA Button | Status | Notes |
|-----|------------|--------|-------|
| Home | All | Complete | Footer and header consistent, tested |
| Wins | All | Complete | Header now matches Home |
| Edge | All | Complete | Header now matches Home |
| Blueprint | All | Complete | Header now matches Home |
| Insights | All | Complete | Header and footer match Home, tested |

---

**Notes:**
- Some buttons use the Button component with just a label and no explicit handler, meaning their action may be defined by navigation, a parent handler, or is yet to be implemented.
- Dynamic entries represent cases where the label or handler is determined at runtime (e.g., settings, interactive cards).
- The table does not include every single TouchableOpacity/Button instance, but focuses on those that are clearly CTAs or user-facing actions.
- Rows 3 and 4: Contact form should be modern; mvara@mvara.ai is for reference only, not necessarily for direct email use.
- For a complete audit, review all usages of the Button, TouchableOpacity, and similar components, especially where the label/action is dynamic.
- Rows 6 and 8 were tested and confirmed to work as expected, using the specified URLs.
