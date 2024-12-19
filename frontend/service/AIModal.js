// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = 'AIzaSyBDU8txJP_ONBO_xG-pPiU16RrM5pLexDE'
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
}

export const AIChatSession = model.startChat({
  generationConfig,
  history: [],
})
