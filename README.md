# InfluencerFlow AI

An AI-powered platform for social media influencers to easily create and manage integrated storefronts, generate product descriptions, and craft engaging sales prompts.

## 🚀 Features

### Core Features
- **AI-Generated Product Descriptions**: Create compelling product descriptions using advanced AI
- **One-Click Storefront Setup**: Launch professional storefronts in minutes
- **AI-Powered Sales Prompts**: Generate engaging social media content for Instagram, TikTok, Stories
- **Automated Order Fulfillment**: Connect to drop-shipping and print-on-demand services

### Technical Features
- **Modern React Architecture**: Built with React 18, Vite, and modern JavaScript
- **Real-time AI Integration**: OpenAI GPT-3.5 integration for content generation
- **Subscription Management**: Stripe integration for tiered subscription plans
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Zustand for efficient state management
- **Animations**: Framer Motion for smooth animations and transitions

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: OpenAI API
- **Payments**: Stripe
- **HTTP Client**: Axios
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vistara-apps/this-is-a-7844.git
   cd this-is-a-7844
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:3001/api
   
   # OpenAI Configuration
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   
   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   VITE_STRIPE_PRO_PRICE_ID=price_your_pro_price_id_here
   VITE_STRIPE_BUSINESS_PRICE_ID=price_your_business_price_id_here
   
   # App Configuration
   VITE_APP_NAME=InfluencerFlow AI
   VITE_APP_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Modal.jsx       # Modal component with variants
│   ├── ProductCard.jsx # Product display component
│   ├── AgentChat.jsx   # AI chat interface
│   └── AppShell.jsx    # Main app layout
├── pages/              # Page components
│   ├── Landing.jsx     # Landing page
│   ├── Dashboard.jsx   # Main dashboard
│   ├── StorefrontSetup.jsx
│   ├── ProductManager.jsx
│   ├── AITools.jsx     # AI generation tools
│   └── Pricing.jsx     # Subscription plans
├── services/           # External service integrations
│   ├── api.js         # API client and endpoints
│   ├── openai.js      # OpenAI integration
│   └── stripe.js      # Stripe payment integration
├── stores/            # Zustand state stores
│   ├── authStore.js   # Authentication state
│   ├── aiStore.js     # AI functionality state
│   └── storefrontStore.js # Storefront management
├── App.jsx            # Main app component
└── index.css          # Global styles and design system
```

## 🎨 Design System

The app uses a custom design system built with Tailwind CSS:

### Colors
- **Primary**: `hsl(220 95% 55%)` - Main brand color
- **Accent**: `hsl(260 95% 65%)` - Secondary accent
- **Background**: `hsla(215 28% 15% / 0.9)` - Dark background
- **Surface**: `hsla(215 28% 20% / 1)` - Card backgrounds
- **Text Primary**: `hsl(0 0% 95%)` - Main text
- **Text Secondary**: `hsl(0 0% 80%)` - Secondary text

### Components
- **Buttons**: Primary, secondary, outline, destructive variants
- **Cards**: Consistent card styling with shadows
- **Inputs**: Form inputs with focus states
- **Modals**: Animated modal system with variants

## 🔧 API Integration

### OpenAI Integration
The app integrates with OpenAI's GPT-3.5 model for:
- Product description generation
- Social media sales prompt creation
- Storefront copy generation

### Stripe Integration
Subscription management with three tiers:
- **Free**: 1 storefront, 5 products, 50 AI generations/month
- **Pro ($29/month)**: 5 storefronts, unlimited products, 500 AI generations/month
- **Business ($79/month)**: Unlimited everything, 2000 AI generations/month

## 🚀 Deployment

### Frontend Deployment
The app can be deployed to any static hosting service:

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service (Vercel, Netlify, etc.)

### Environment Variables for Production
Make sure to set all environment variables in your hosting platform:
- `VITE_API_BASE_URL`
- `VITE_OPENAI_API_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_STRIPE_PRO_PRICE_ID`
- `VITE_STRIPE_BUSINESS_PRICE_ID`

## 📱 Features Overview

### For Influencers
- **Quick Storefront Creation**: Set up professional storefronts in minutes
- **AI Content Generation**: Generate compelling product descriptions and sales copy
- **Multi-Platform Support**: Create content for Instagram, TikTok, Stories, and email
- **Subscription Management**: Flexible plans that scale with your business

### For Developers
- **Modern Architecture**: Clean, maintainable React codebase
- **Type Safety**: Comprehensive error handling and validation
- **Performance**: Optimized with lazy loading and efficient state management
- **Extensible**: Easy to add new features and integrations

## 🔐 Security

- **API Key Management**: Secure handling of API keys
- **Payment Security**: PCI-compliant Stripe integration
- **Data Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error handling and user feedback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@influencerflow.ai or join our Discord community.

## 🗺️ Roadmap

- [ ] Backend API implementation
- [ ] Database integration (PostgreSQL)
- [ ] Social media platform integrations
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Fulfillment service integrations (Printful, Shopify)
- [ ] White-label solutions
- [ ] API access for enterprise customers

---

Built with ❤️ for the influencer community
