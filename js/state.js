/**
 * Central State Management
 * Manages all application state with validation and updates
 */

const AppState = {
  // Provider & Auth
  currentProvider: 'openrouter',
  apiKey: '',
  hfToken: '',
  isAuthenticated: false,

  // Chat & Messages
  chatHistory: [],
  attachedFiles: [],
  isTyping: false,
  currentBubble: null,

  // Models & Settings
  selectedModel: 'none',
  selectedModelB: 'none',
  allModels: [],
  modelContextMap: {},
  currentPersonaPrompt: 'You are a helpful AI assistant. Be concise, accurate, and developer-friendly. Use Markdown formatting in your responses.',
  systemPrompt: '',
  temperature: 0.7,
  maxTokens: 1024,

  // UI State
  compareMode: false,
  searchActive: false,
  sidebarOpen: false,
  statsOpen: false,
  plainMode: false,
  voiceRecording: false,

  // Analytics
  totalPromptTokens: 0,
  totalCompletionTokens: 0,
  turnTokens: [],
  sessionStats: {
    startTime: null,
    messageCount: 0,
    turnCount: 0,
  },

  // Search & Filter
  searchMatches: [],
  searchCurrent: 0,
  searchQuery: '',

  // API Requests
  abortController: null,
  requestQueue: [],
  requestLimitPerMinute: 30,
  lastRequestTime: 0,

  /**
   * Initialize state with stored values
   */
  init() {
    this.loadPersistedState();
    this.sessionStats.startTime = Date.now();
  },

  /**
   * Load persisted state from localStorage (securely)
   */
  loadPersistedState() {
    try {
      const stored = localStorage.getItem('cwiState');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only restore safe, non-sensitive data
        if (parsed.currentProvider) this.currentProvider = parsed.currentProvider;
        if (parsed.temperature !== undefined) this.temperature = parsed.temperature;
        if (parsed.maxTokens) this.maxTokens = parsed.maxTokens;
        if (parsed.currentPersonaPrompt) this.currentPersonaPrompt = parsed.currentPersonaPrompt;
        // NOTE: API keys are NOT loaded from storage
      }
    } catch (e) {
      console.error('Failed to load persisted state:', e);
    }
  },

  /**
   * Save state to localStorage (excludes sensitive data)
   */
  persistState() {
    try {
      const safe = {
        currentProvider: this.currentProvider,
        temperature: this.temperature,
        maxTokens: this.maxTokens,
        currentPersonaPrompt: this.currentPersonaPrompt,
        // Intentionally excluding: apiKey, hfToken, chatHistory
      };
      localStorage.setItem('cwiState', JSON.stringify(safe));
    } catch (e) {
      console.error('Failed to persist state:', e);
    }
  },

  /**
   * Add message to chat history
   */
  addMessage(role, content) {
    if (!content || typeof content !== 'string') {
      console.warn('Invalid message content');
      return false;
    }
    this.chatHistory.push({ role, content, timestamp: Date.now() });
    this.sessionStats.messageCount++;
    if (role === 'assistant') {
      this.sessionStats.turnCount++;
    }
    return true;
  },

  /**
   * Update token statistics
   */
  updateTokens(promptTokens, completionTokens) {
    if (typeof promptTokens !== 'number' || typeof completionTokens !== 'number') {
      console.warn('Invalid token values');
      return false;
    }
    this.totalPromptTokens += promptTokens;
    this.totalCompletionTokens += completionTokens;
    this.turnTokens.push({ p: promptTokens, c: completionTokens });
    return true;
  },

  /**
   * Check rate limit
   */
  canMakeRequest() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const minDelayMs = (60000 / this.requestLimitPerMinute);
    return timeSinceLastRequest >= minDelayMs;
  },

  /**
   * Record request time for rate limiting
   */
  recordRequest() {
    this.lastRequestTime = Date.now();
  },

  /**
   * Clear all chat data
   */
  clearChat() {
    this.chatHistory = [];
    this.totalPromptTokens = 0;
    this.totalCompletionTokens = 0;
    this.turnTokens = [];
    this.sessionStats.messageCount = 0;
    this.sessionStats.turnCount = 0;
    this.attachedFiles = [];
  },

  /**
   * Reset to initial state
   */
  reset() {
    this.clearChat();
    this.apiKey = '';
    this.hfToken = '';
    this.isAuthenticated = false;
    this.selectedModel = 'none';
    this.selectedModelB = 'none';
  },

  /**
   * Get context usage percentage
   */
  getContextUsage() {
    const modelId = this.selectedModel;
    const ctxSize = this.modelContextMap[modelId] || 8192;
    const used = this.totalPromptTokens + this.totalCompletionTokens;
    return Math.min(used / ctxSize, 1);
  },

  /**
   * Get current context limit
   */
  getContextLimit() {
    return this.modelContextMap[this.selectedModel] || 8192;
  },

  /**
   * Validate provider selection
   */
  isValidProvider(provider) {
    return provider === 'openrouter' || provider === 'huggingface';
  },

  /**
   * Get current auth token
   */
  getAuthToken() {
    return this.currentProvider === 'openrouter' ? this.apiKey : this.hfToken;
  },

  /**
   * Check authentication status
   */
  isAuthenticatedFor(provider) {
    if (provider === 'openrouter') return !!this.apiKey;
    if (provider === 'huggingface') return !!this.hfToken;
    return false;
  },
};

// Freeze the AppState object to prevent accidental modifications
Object.seal(AppState);