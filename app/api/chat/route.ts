import { NextRequest, NextResponse } from 'next/server'

interface StockData {
  symbol: string
  price: number
  change: number
  changePercent: number
}

interface PortfolioItem {
  symbol: string
  shares: number
  avgCost: number
  currentPrice: number
}

const mockStockData: { [key: string]: StockData } = {
  'AAPL': { symbol: 'AAPL', price: 178.25, change: 2.45, changePercent: 1.39 },
  'GOOGL': { symbol: 'GOOGL', price: 142.80, change: -1.20, changePercent: -0.83 },
  'MSFT': { symbol: 'MSFT', price: 398.50, change: 5.30, changePercent: 1.35 },
  'TSLA': { symbol: 'TSLA', price: 242.15, change: -3.85, changePercent: -1.56 },
  'AMZN': { symbol: 'AMZN', price: 168.90, change: 0.75, changePercent: 0.45 },
  'NVDA': { symbol: 'NVDA', price: 725.30, change: 12.50, changePercent: 1.75 },
}

const mockPortfolio: PortfolioItem[] = [
  { symbol: 'AAPL', shares: 50, avgCost: 165.00, currentPrice: 178.25 },
  { symbol: 'GOOGL', shares: 30, avgCost: 138.50, currentPrice: 142.80 },
  { symbol: 'MSFT', shares: 25, avgCost: 385.00, currentPrice: 398.50 },
]

function getStockPrice(symbol: string): string {
  const upperSymbol = symbol.toUpperCase()
  const stock = mockStockData[upperSymbol]

  if (stock) {
    const changeSign = stock.change >= 0 ? '+' : ''
    return `📊 **${stock.symbol}** is currently trading at **$${stock.price.toFixed(2)}**\n\n` +
           `Change: ${changeSign}$${stock.change.toFixed(2)} (${changeSign}${stock.changePercent.toFixed(2)}%)\n\n` +
           `${stock.change >= 0 ? '📈 Positive momentum!' : '📉 Slight decline today.'}`
  }

  return `I don't have data for ${symbol}. Try AAPL, GOOGL, MSFT, TSLA, AMZN, or NVDA.`
}

function analyzePortfolio(): string {
  let totalCost = 0
  let totalValue = 0
  let analysis = '📊 **Portfolio Analysis**\n\n'

  mockPortfolio.forEach(item => {
    const cost = item.shares * item.avgCost
    const value = item.shares * item.currentPrice
    const gain = value - cost
    const gainPercent = ((value - cost) / cost) * 100

    totalCost += cost
    totalValue += value

    const gainSign = gain >= 0 ? '+' : ''
    analysis += `**${item.symbol}**: ${item.shares} shares\n`
    analysis += `Value: $${value.toFixed(2)} | Gain: ${gainSign}$${gain.toFixed(2)} (${gainSign}${gainPercent.toFixed(2)}%)\n\n`
  })

  const totalGain = totalValue - totalCost
  const totalGainPercent = ((totalValue - totalCost) / totalCost) * 100
  const gainSign = totalGain >= 0 ? '+' : ''

  analysis += `**Total Portfolio Value**: $${totalValue.toFixed(2)}\n`
  analysis += `**Total Gain/Loss**: ${gainSign}$${totalGain.toFixed(2)} (${gainSign}${totalGainPercent.toFixed(2)}%)\n\n`
  analysis += totalGain >= 0 ? '✅ Great performance!' : '⚠️ Consider rebalancing.'

  return analysis
}

function getBudgetSummary(): string {
  return `💰 **Budget Summary - January 2026**\n\n` +
         `**Income**: $8,500\n` +
         `**Expenses**: $5,230\n\n` +
         `**Breakdown**:\n` +
         `• Housing: $2,100 (40%)\n` +
         `• Food: $850 (16%)\n` +
         `• Transportation: $620 (12%)\n` +
         `• Utilities: $340 (7%)\n` +
         `• Entertainment: $520 (10%)\n` +
         `• Savings: $800 (15%)\n\n` +
         `**Remaining**: $3,270\n` +
         `✅ You're 38% under budget! Keep it up!`
}

function getMarketTrends(): string {
  return `📈 **Market Trends Overview**\n\n` +
         `**S&P 500**: 5,245.32 (+0.85%)\n` +
         `**NASDAQ**: 16,780.50 (+1.23%)\n` +
         `**Dow Jones**: 38,654.25 (+0.42%)\n\n` +
         `**Top Performers**:\n` +
         `🔥 NVDA: +1.75%\n` +
         `🔥 AAPL: +1.39%\n` +
         `🔥 MSFT: +1.35%\n\n` +
         `**Market Sentiment**: Bullish\n` +
         `Tech sector showing strong momentum. Consider tech diversification.`
}

function processMessage(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Stock price queries
  const stockMatch = lowerMessage.match(/(?:check|show|what|price|stock).*?(aapl|googl|msft|tsla|amzn|nvda)/i)
  if (stockMatch) {
    return getStockPrice(stockMatch[1])
  }

  // Portfolio analysis
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('analyze')) {
    return analyzePortfolio()
  }

  // Budget queries
  if (lowerMessage.includes('budget') || lowerMessage.includes('spending')) {
    return getBudgetSummary()
  }

  // Market trends
  if (lowerMessage.includes('market') || lowerMessage.includes('trend')) {
    return getMarketTrends()
  }

  // General financial advice
  if (lowerMessage.includes('invest') || lowerMessage.includes('save')) {
    return `💡 **Investment Tips**:\n\n` +
           `1. **Diversify** your portfolio across sectors\n` +
           `2. **Long-term** thinking beats short-term trading\n` +
           `3. **Regular contributions** - dollar-cost averaging works\n` +
           `4. **Emergency fund** - aim for 3-6 months expenses\n` +
           `5. **Review quarterly** - stay informed, not obsessed\n\n` +
           `Ask me about specific stocks, your portfolio, or market trends!`
  }

  // Help message
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
    return `🤖 **I can help you with**:\n\n` +
           `📊 Check stock prices (AAPL, GOOGL, MSFT, etc.)\n` +
           `💼 Analyze your portfolio performance\n` +
           `💰 Review your budget and spending\n` +
           `📈 Get market trends and insights\n` +
           `💡 Provide investment tips and advice\n\n` +
           `Try asking: "Check AAPL stock price" or "Analyze my portfolio"`
  }

  // Default response
  return `I understand you're asking about: "${message}"\n\n` +
         `I can help with:\n` +
         `• Stock prices (try "Check AAPL")\n` +
         `• Portfolio analysis\n` +
         `• Budget tracking\n` +
         `• Market trends\n\n` +
         `What would you like to know?`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    const response = processMessage(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
