# Resume AI Feedback

## Overview

Resume AI Feedback is an innovative web application that leverages artificial intelligence to provide instant, comprehensive analysis of job seekers' resumes. Our tool helps users improve their resumes and increase their chances of landing their dream job.

## Features

- AI-powered resume analysis
- Instant feedback and recommendations
- Personalized improvement suggestions
- Easy-to-understand resume scoring
- Support for multiple file formats

## Prerequisites

- Node.js (v18 or later)
- npm or Yarn
- OpenAI API key (or alternative AI service credentials)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/jahnvisahni31/OptiResume.git
cd resume-ai-feedback
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file and add your API keys:
```
OPENAI_API_KEY=your_openai_api_key
```

## Running the Application

Development mode:
```bash
npm run dev
# or
yarn dev
```

Production build:
```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
resume-ai-feedback/
├── components/
│   ├── ResumeUploader.js
│   └── AIFeedback.js
├── pages/
│   ├── index.js
│   └── api/
│       └── analyze-resume.js
├── styles/
│   └── global.css
└── utils/
    └── aiAnalysis.js
```

## Technologies

- Next.js
- React
- OpenAI API
- Tailwind CSS
- TypeScript (optional)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [jahnvi sahni](https://github.com/jahnvisahni31)

Project Link: [https://github.com/jahnvisahni31/OptiResume](https://github.com/jahnvisahni31/OptiResume)
