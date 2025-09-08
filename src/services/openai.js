import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
})

/**
 * Generate product description using OpenAI
 * @param {Object} productInfo - Product information
 * @param {string} productInfo.name - Product name
 * @param {string} productInfo.category - Product category
 * @param {string} productInfo.price - Product price
 * @param {string} productInfo.targetAudience - Target audience
 * @param {string} productInfo.keyFeatures - Key features
 * @returns {Promise<string>} Generated description
 */
export const generateProductDescription = async (productInfo) => {
  try {
    const prompt = `
Create a compelling product description for an influencer's storefront. The product details are:

Product Name: ${productInfo.name}
Category: ${productInfo.category || 'Fashion/Lifestyle'}
Price: ${productInfo.price || 'Premium'}
Target Audience: ${productInfo.targetAudience || 'Young adults, fashion-conscious'}
Key Features: ${productInfo.keyFeatures || 'High quality, trendy, versatile'}

Requirements:
- Write in an engaging, conversational tone that resonates with social media audiences
- Include emotional triggers and lifestyle benefits
- Use emojis strategically (2-3 maximum)
- Keep it between 80-150 words
- Focus on how the product makes the customer feel
- Include a subtle call-to-action
- Make it sound authentic, not overly salesy

Write the description now:
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert copywriter specializing in influencer marketing and e-commerce product descriptions. You understand social media culture and write in a way that converts followers into customers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 200,
      temperature: 0.8,
    })

    return completion.choices[0].message.content.trim()
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw new Error('Failed to generate product description. Please try again.')
  }
}

/**
 * Generate sales prompt for social media
 * @param {Object} productInfo - Product information
 * @param {string} promptType - Type of prompt (instagram, story, tiktok, email)
 * @returns {Promise<string>} Generated sales prompt
 */
export const generateSalesPrompt = async (productInfo, promptType = 'instagram') => {
  try {
    const platformSpecs = {
      instagram: {
        maxLength: 2200,
        style: 'Instagram post with hashtags',
        features: 'Use relevant hashtags, engaging caption, call-to-action'
      },
      story: {
        maxLength: 100,
        style: 'Instagram/Snapchat story',
        features: 'Short, punchy, designed for swipe-up or link sticker'
      },
      tiktok: {
        maxLength: 150,
        style: 'TikTok caption',
        features: 'Trendy language, relevant hashtags, hook for video content'
      },
      email: {
        maxLength: 500,
        style: 'Email marketing',
        features: 'Subject line + body, personal tone, clear CTA'
      }
    }

    const spec = platformSpecs[promptType] || platformSpecs.instagram

    const prompt = `
Create a ${spec.style} sales prompt for this product:

Product: ${productInfo.name}
Price: ${productInfo.price || 'Check link'}
Key Appeal: ${productInfo.keyFeatures || 'Must-have item'}

Platform: ${promptType.toUpperCase()}
Requirements:
- ${spec.features}
- Maximum ${spec.maxLength} characters
- Authentic influencer voice
- Create urgency/FOMO
- Include clear next step for followers
- Match current social media trends
- Sound natural, not robotic

${promptType === 'email' ? 'Include both subject line and email body.' : ''}

Generate the ${spec.style} now:
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a social media marketing expert who creates viral content for influencers. You understand platform-specific best practices and current trends on ${promptType}.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: promptType === 'story' ? 50 : 150,
      temperature: 0.9,
    })

    return completion.choices[0].message.content.trim()
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw new Error('Failed to generate sales prompt. Please try again.')
  }
}

/**
 * Generate storefront copy (about section, welcome message, etc.)
 * @param {Object} storefrontInfo - Storefront information
 * @returns {Promise<Object>} Generated copy sections
 */
export const generateStorefrontCopy = async (storefrontInfo) => {
  try {
    const prompt = `
Create copy for an influencer's storefront with these details:

Influencer Name: ${storefrontInfo.influencerName}
Niche: ${storefrontInfo.niche || 'Lifestyle/Fashion'}
Brand Voice: ${storefrontInfo.brandVoice || 'Friendly, authentic, inspiring'}
Target Audience: ${storefrontInfo.audience || 'Young adults interested in lifestyle content'}

Generate:
1. Welcome Message (2-3 sentences)
2. About Section (4-5 sentences)
3. Shop Description (1-2 sentences)

Make it personal, authentic, and aligned with influencer marketing best practices.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a brand strategist specializing in influencer storefronts. You create authentic, engaging copy that builds trust and drives sales."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    })

    const response = completion.choices[0].message.content.trim()
    
    // Parse the response into sections
    const sections = response.split('\n').filter(line => line.trim())
    
    return {
      welcomeMessage: sections.find(s => s.includes('Welcome') || s.includes('1.'))?.replace(/^\d+\.\s*/, '').replace('Welcome Message:', '').trim(),
      aboutSection: sections.find(s => s.includes('About') || s.includes('2.'))?.replace(/^\d+\.\s*/, '').replace('About Section:', '').trim(),
      shopDescription: sections.find(s => s.includes('Shop') || s.includes('3.'))?.replace(/^\d+\.\s*/, '').replace('Shop Description:', '').trim(),
    }
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw new Error('Failed to generate storefront copy. Please try again.')
  }
}

export default {
  generateProductDescription,
  generateSalesPrompt,
  generateStorefrontCopy
}
