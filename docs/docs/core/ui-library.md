---
sidebar_position: 2
---

# Chakra UI Theme Configuration

This application uses Chakra UI for consistent and customizable UI components. The theme is configured and extended using Chakra UI’s `extendTheme` function, allowing us to tailor colors, font sizes, components, and global styles to our design needs.

## Overview of Chakra UI Theme Configuration

### 1. **Colors**
The color palette for the application is defined in the `colors.ts` file. This centralized location allows for easy management and consistency of the theme colors throughout the application. Custom colors can be added or modified as needed, ensuring a unified color scheme across components.

### 2. **Font Sizes**
Font sizes are defined in the `fontsize.ts` file to ensure consistency in typography throughout the app. By centralizing font size configurations, we maintain a scalable and consistent typography system across various components.

### 3. **Components**
Several Chakra UI components are customized in this theme to meet the design requirements of the application:
- **Button**: The default styling for buttons is overridden to match the application’s design language.
- **Tag**: Custom styles for tags ensure they align with the overall theme.
- **Badge**: The badge component is customized for consistent visual appearance.
- **Input**: Input fields have been styled for a consistent look and feel.

These customizations help ensure that the application’s UI elements remain consistent with the desired design aesthetics.

### 4. **Global Styles**
The global styles are defined under the `styles.global` property. Key elements of the global styling include:
- **Scrollbar Customization**: Custom styles are applied to the scrollbars to improve the user experience, including transparent tracks and rounded thumb styling.
- **Body and HTML Styles**: These styles are applied globally to ensure that the background color, text color, and font family are consistent throughout the app.
- **Focus States**: Custom focus styles are used for form elements, buttons, and links to maintain a consistent design without default browser outlines.
- **Overflow Management**: To prevent horizontal scrolling issues, the `overflowX` property is set to 'hidden' globally.

### 5. **Customization**
The Chakra UI theme can be easily customized:
- To modify colors, adjust the `colors.ts` file.
- Font sizes can be updated in the `fontsize.ts` file.
- Any additional customization to components or global styles can be done by modifying the respective files.

By using Chakra UI’s theming system, the application maintains a consistent, scalable, and flexible UI design, making it easier to manage and extend the styling as the app grows.


