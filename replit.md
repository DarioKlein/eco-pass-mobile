# EcoPass - Recycling Incentive Application

## Overview

EcoPass is a modern frontend application built with React, TypeScript, and Tailwind CSS that incentivizes recycling by allowing users to earn credits for recycling materials. These credits can be redeemed for public transportation. The application features a responsive, mobile-first design with a dashboard/admin layout that works seamlessly across mobile and desktop devices.

The app simulates a complete recycling ecosystem where users can register recycling submissions, view their digital card with QR codes, track their credits, and redeem them for transportation options. It includes an admin validation system for approving recycling submissions.

## Recent Changes

**September 28, 2025** - Complete EcoPass application implementation:
- Built all core pages: Login/Register, Dashboard, My Card, New Recycling, Redeem Credits, Validation Admin
- Implemented responsive navigation with desktop sidebar and mobile menu
- Added QR code generation for digital cards
- Created complete authentication system with localStorage persistence
- Built recycling submission and approval workflow
- Added credit redemption system for transport options
- Applied modern green-themed UI design following reference image

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom color palette and responsive design utilities
- **Routing**: React Router DOM v7 for client-side navigation and route protection
- **State Management**: React Context API for authentication and user state management

### Component Structure
- **Layout Components**: Responsive navigation with mobile hamburger menu and desktop sidebar
- **Page Components**: Modular page structure including Dashboard, Login, MyCard, NewRecycling, RedeemCredits, and ValidationAdmin
- **Protected Routes**: Authentication-based route protection redirecting unauthenticated users to login
- **Context Providers**: Centralized authentication context for user session management

### Data Management
- **Storage Solution**: localStorage for client-side data persistence (simulating backend functionality)
- **Data Models**: TypeScript interfaces for User, RecyclingItem, CollectionPoint, and TransportOption entities
- **State Persistence**: User authentication state and application data persisted across browser sessions

### Authentication System
- **Method**: localStorage-based authentication simulation without backend dependency
- **User Management**: Registration, login, logout functionality with form validation
- **Session Persistence**: Automatic user session restoration on application reload
- **Route Protection**: Private routes requiring authentication with redirect logic

### UI/UX Design
- **Design System**: Mobile-first responsive design with Tailwind CSS utilities
- **Color Scheme**: Custom primary green color palette reflecting environmental theme
- **Icons**: Lucide React icon library for consistent iconography
- **Layout**: Dashboard-style interface with sidebar navigation and main content area

## External Dependencies

### Core Libraries
- **React & React DOM**: Frontend framework and DOM rendering
- **TypeScript**: Static type checking and enhanced development experience
- **React Router DOM**: Client-side routing and navigation management

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework with PostCSS integration
- **Lucide React**: Comprehensive icon library for consistent UI elements
- **QRCode.react**: QR code generation for digital card functionality

### Build & Development
- **Vite**: Fast build tool with hot module replacement and optimized bundling
- **@vitejs/plugin-react**: React plugin for Vite with JSX transformation
- **PostCSS & Autoprefixer**: CSS processing and browser compatibility

### Type Definitions
- **@types/react**: TypeScript definitions for React
- **@types/react-dom**: TypeScript definitions for React DOM
- **@types/react-router-dom**: TypeScript definitions for React Router
- **@types/qrcode.react**: TypeScript definitions for QR code library

The application is designed to be fully functional without external backend services, using localStorage to simulate database operations and user authentication, making it ideal for demonstration and development purposes.