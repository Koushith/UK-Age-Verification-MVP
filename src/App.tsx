import { Button } from './components/ui/button';
import {
  CheckCircle,
  Shield,
  Zap,
  Copy,
  Menu,
  Rocket,
  Users,
  Building2,
  Globe,
  Wallet,
  Brain,
  Camera,
  LogIn,
  Clock,
  Heart,
  DollarSign,
  Timer,
  Database,
  ShieldCheck,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Highlight } from 'prism-react-renderer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog';
import { useState } from 'react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { JSONTree } from 'react-json-tree';
import QRCode from 'react-qr-code';
import { useIsMobile } from './hooks/use-mobile';

const App = () => {
  const [requestUrl, setRequestUrl] = useState<string | null>(null);
  const [proofs, setProofs] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState({ type: 'none', step: 'none' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();

  const getVerificationReq = async () => {
    setLoadingState({ type: 'provider', step: 'generating' });
    try {
      // Your credentials from the Reclaim Developer Portal
      // Replace these with your actual credentials

      const APP_ID = import.meta.env.VITE_RECLAIM_APP_ID;
      const APP_SECRET = import.meta.env.VITE_RECLAIM_APP_SECRET;

      const PROVIDER_ID = '02394885-47b8-4a20-833d-0801ccccc9e4';

      // Check if device is mobile
      const isMobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ||
        (typeof window.orientation !== 'undefined' ? window.orientation : -1) > -1;

      // Check if device is iOS
      const isIOS = /mac|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()) || false;

      // Determine device type
      const deviceType = isMobile ? (isIOS ? 'ios' : 'android') : 'desktop';

      // Initialize the Reclaim SDK with your credentials
      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID, {
        device: deviceType,
        useAppClip: deviceType !== 'desktop',
      });
      // Generate the verification request URL
      const requestUrl = await reclaimProofRequest.getRequestUrl();
      console.log('Request URL:', requestUrl);
      setRequestUrl(requestUrl);
      setLoadingState({ type: 'none', step: 'none' });

      // Start listening for proof submissions
      await reclaimProofRequest.startSession({
        // Called when the user successfully completes the verification
        onSuccess: (proofs) => {
          if (proofs) {
            if (typeof proofs === 'string') {
              // Parse the string into an object
              const parsedProof = JSON.parse(proofs);
              setProofs([parsedProof]);
            } else if (typeof proofs !== 'string') {
              if (Array.isArray(proofs)) {
                console.log('Verification success', JSON.stringify(proofs.map((p) => p.claimData.context)));
                setProofs(proofs);
              } else {
                console.log('Verification success', proofs?.claimData.context);
                setProofs([proofs]);
              }
            }
          }
          // Reset loading state when proofs are received
          setLoadingState({ type: 'none', step: 'none' });
          // Add your success logic here, such as:
          // - Updating UI to show verification success
          // - Storing verification status
          // - Redirecting to another page
        },
        // Called if there's an error during verification
        onError: (error) => {
          console.error('Verification failed', error);
          setErrorMessage(error instanceof Error ? error.message.split(': ')[1] : 'An unknown error occurred');
          setLoadingState({ type: 'none', step: 'none' });

          // Add your error handling logic here, such as:
          // - Showing error message to user
          // - Resetting verification state
          // - Offering retry options
        },
      });
    } catch (error) {
      console.error('Error generating verification request:', error);
      setErrorMessage(error instanceof Error ? error.message.split(': ')[1] : 'An unknown error occurred');
      setLoadingState({ type: 'none', step: 'none' });
    }
  };

  console.log(errorMessage);

  // Handle modal open to trigger verification request
  const handleModalOpen = async (open: boolean) => {
    setIsModalOpen(open);
    if (open && !requestUrl) {
      // Call getVerificationReq when modal opens and we don't have a URL yet
      await getVerificationReq();
    }
  };

  // Add a function to handle mobile verification
  const handleMobileVerification = () => {
    setLoadingState({ type: 'verification', step: 'waiting' });
    window.open(requestUrl!, '_blank');
  };

  const ukCode = `import { ReclaimClient } from '@reclaimprotocol/js-sdk';
  
  const handleVerification = async () => {

  const APP_ID='0x71A6f91E69BDf0042ba9154B0f2e2730836e088F'
  const APP_SECRET='0x253ced133dc64537df17e1a5fee94f374d5a4075adbad954c0fc5fc0e3a12211'

  // 02394885-47b8-4a20-833d-0801ccccc9e4 (Wales NHS Age verification)
  // checkout https://dev.reclaimprotocol.org/explore for more providers
  const PROVIDER_ID='47b3843c-e0a1-4462-8461-77d22ad768aa' //(Eng NHS provider ID)
  
  const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID);
  await reclaimProofRequest.triggerReclaimFlow();
 
  await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
         console.log('Verification successful:', proofs);  
        },
        onError: (error) => {
            console.error('Verification failed', error);
        },
     
  });
}  
`;

  // QR Code SVG component for better readability

  // extremely small, dependency-free highlighter for demo purposes

  // Helper function to extract parameters from proof
  const getExtractedParameters = (proof: any) => {
    try {
      if (proof?.claimData?.context) {
        const context = JSON.parse(proof.claimData.context);
        return context.extractedParameters || {};
      }
      return {};
    } catch (error) {
      console.error('Error parsing proof context:', error);
      return {};
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed bg-white text-black inset-x-0 top-0 z-50 backdrop-blur-lg border-b shadow-lg">
        <nav className="mx-auto max-w-[1600px] px-6 h-20">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-3">
              <a href="/" className="group">
                <div className="flex items-center gap-3 transition-transform group-hover:scale-105">
                  <div className="relative">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-black drop-shadow-lg"
                    >
                      <path d="M16 2L2 16L16 30L30 16L16 2Z" stroke="currentColor" strokeWidth="2.5"></path>
                      <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="currentColor"></path>
                    </svg>
                    <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl -z-10"></div>
                  </div>
                  <div>
                    <span className="text-xl font-bold text-black drop-shadow-sm">Reclaim</span>
                    <div className="text-sm text-black/80 font-medium -mt-1">Age Verification</div>
                  </div>
                </div>
              </a>
            </div>

            <div className="hidden lg:flex lg:items-center lg:gap-x-8">
              <a
                href="#features"
                className="relative text-sm font-medium text-gray-900 hover:text-white transition-all duration-200 group py-2"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#how-it-works"
                className="relative text-sm font-medium text-gray-900 hover:text-white transition-all duration-200 group py-2"
              >
                How it Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a
                href="#who-is-it-for"
                className="relative text-sm font-medium text-gray-900 hover:text-white transition-all duration-200 group py-2"
              >
                Who is it For?
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white rounded-full transition-all duration-200 group-hover:w-full"></span>
              </a>
              <div className="h-6 w-px bg-white/20"></div>
            </div>

            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/90 hover:text-white hover:bg-white/20 rounded-lg border border-white/20 backdrop-blur-sm"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="h-full overflow-x-hidden font-sans antialiased">
          {/* Hero Section */}
          <section
            className="relative overflow-hidden pt-40 pb-32 sm:pt-48 sm:pb-40"
            style={{ backgroundColor: 'rgb(0, 0, 238)' }}
          >
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute h-full w-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]"></div>
              <div className="absolute h-full w-full bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.1),transparent_30%)]"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
            <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
              <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-16">
                {/* Left Section - Text Content */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      THE BEST AGE VERIFICATION solution in the market today
                    </h1>
                    <p className="text-base text-white/90 leading-relaxed">
                      Comply with global age verification regulations while protecting User Privacy
                    </p>
                  </div>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <Button
                      onClick={() => {
                        window.open('https://app.reclaim.ai/m/subhash/clients', '_blank');
                      }}
                      className="bg-white text-gray-900 hover:bg-gray-100 font-medium transition-colors group cursor-pointer shadow-lg"
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Book Demo
                    </Button>
                  </div>
                  <div className="mt-16 flex flex-wrap items-center gap-4">
                    <div className="group flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 ring-1 ring-white/30 transition-all hover:ring-white/50 hover:bg-white/30">
                      <span
                        className="rounded-full p-1.5 text-white ring-1 ring-white/30 group-hover:text-white"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <Heart className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white">PII data censored → Happy Customers</span>
                    </div>
                    <div className="group flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 ring-1 ring-white/30 transition-all hover:ring-white/50 hover:bg-white/30">
                      <span
                        className="rounded-full p-1.5 text-white ring-1 ring-white/30 group-hover:text-white"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <DollarSign className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white">Cheapest solution in the market</span>
                    </div>
                    <div className="group flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 ring-1 ring-white/30 transition-all hover:ring-white/50 hover:bg-white/30">
                      <span
                        className="rounded-full p-1.5 text-white ring-1 ring-white/30 group-hover:text-white"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <Timer className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white">5 mins to Integrate</span>
                    </div>
                    <div className="group flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 ring-1 ring-white/30 transition-all hover:ring-white/50 hover:bg-white/30">
                      <span
                        className="rounded-full p-1.5 text-white ring-1 ring-white/30 group-hover:text-white"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <Database className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white">Reliable Govt. Sources</span>
                    </div>
                    <div className="group flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-sm px-5 py-2 ring-1 ring-white/30 transition-all hover:ring-white/50 hover:bg-white/30">
                      <span
                        className="rounded-full p-1.5 text-white ring-1 ring-white/30 group-hover:text-white"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        <ShieldCheck className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-white">Compliant Verification</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Code Snippet */}
                <div className="w-full lg:w-1/2">
                  <div
                    className="rounded-2xl border border-white/30 p-8 backdrop-blur-sm shadow-2xl"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <Tabs defaultValue="uk" className="w-full">
                      <TabsList
                        className="inline-flex w-full items-center justify-start p-2 rounded-lg gap-2 overflow-x-auto whitespace-nowrap backdrop-blur-sm"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      >
                        <TabsTrigger
                          value="uk"
                          className="relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 
                                   text-white/90 hover:text-white 
                                   data-[state=active]:text-white data-[state=active]:bg-white/25 
                                   data-[state=active]:border-white/40 data-[state=active]:shadow-lg
                                   hover:bg-white/15 border border-transparent"
                        >
                          <span>🇬🇧 UK</span>
                          <span className="text-xs text-emerald-300 ml-2 font-semibold bg-emerald-500/30 px-2 py-0.5 rounded-full">
                            Live
                          </span>
                        </TabsTrigger>

                        <TabsTrigger
                          value="aus"
                          className="relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 
                                   text-white/75 hover:text-white/90 
                                   data-[state=active]:text-white data-[state=active]:bg-white/25 
                                   data-[state=active]:border-white/40 data-[state=active]:shadow-lg
                                   hover:bg-white/10 border border-transparent"
                        >
                          <span>🇦🇺 AUS</span>
                        </TabsTrigger>

                        <TabsTrigger
                          value="us"
                          className="relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 
                                   text-white/75 hover:text-white/90 
                                   data-[state=active]:text-white data-[state=active]:bg-white/25 
                                   data-[state=active]:border-white/40 data-[state=active]:shadow-lg
                                   hover:bg-white/10 border border-transparent"
                        >
                          <span>🇺🇸 US</span>
                        </TabsTrigger>

                        <TabsTrigger
                          value="eu"
                          className="relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 
                                   text-white/75 hover:text-white/90 
                                   data-[state=active]:text-white data-[state=active]:bg-white/25 
                                   data-[state=active]:border-white/40 data-[state=active]:shadow-lg
                                   hover:bg-white/10 border border-transparent"
                        >
                          <span>🇪🇺 EU</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="uk" className="mt-6 space-y-6 min-h-[380px]">
                        {/* Code Block */}
                        <div
                          className="rounded-lg overflow-hidden shadow-lg"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                        >
                          <div className="flex items-center justify-between px-4 py-2 border-b border-white/20">
                            <span className="text-sm text-white/90 font-medium">Integration Code</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigator.clipboard.writeText(ukCode)}
                              className="text-white/80 hover:text-white hover:bg-white/20 text-sm"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              <span>Copy</span>
                            </Button>
                          </div>
                          <div
                            className="overflow-x-auto overflow-y-hidden"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
                          >
                            <Highlight
                              theme={{
                                plain: {
                                  color: '#f8f8f2',
                                  backgroundColor: 'transparent',
                                },
                                styles: [
                                  {
                                    types: ['comment', 'prolog', 'doctype', 'cdata'],
                                    style: {
                                      color: '#6272a4',
                                      fontStyle: 'italic',
                                    },
                                  },
                                  {
                                    types: ['namespace'],
                                    style: {
                                      opacity: 0.7,
                                    },
                                  },
                                  {
                                    types: ['tag', 'operator', 'number'],
                                    style: {
                                      color: '#ff79c6',
                                      fontWeight: 'bold',
                                    },
                                  },
                                  {
                                    types: ['property', 'function'],
                                    style: {
                                      color: '#50fa7b',
                                      fontWeight: '600',
                                    },
                                  },
                                  {
                                    types: ['tag-id', 'selector', 'atrule-id'],
                                    style: {
                                      color: '#f1fa8c',
                                    },
                                  },
                                  {
                                    types: ['attr-name'],
                                    style: {
                                      color: '#50fa7b',
                                    },
                                  },
                                  {
                                    types: [
                                      'boolean',
                                      'string',
                                      'entity',
                                      'url',
                                      'attr-value',
                                      'keyword',
                                      'control',
                                      'directive',
                                      'unit',
                                      'statement',
                                      'regex',
                                      'at-rule',
                                    ],
                                    style: {
                                      color: '#f1fa8c',
                                      fontWeight: '500',
                                    },
                                  },
                                  {
                                    types: ['variable', 'const', 'class', 'function'],
                                    style: {
                                      color: '#8be9fd',
                                      fontWeight: '600',
                                    },
                                  },
                                  {
                                    types: ['punctuation'],
                                    style: {
                                      color: '#f8f8f2',
                                    },
                                  },
                                  {
                                    types: ['selector', 'class-name'],
                                    style: {
                                      color: '#8be9fd',
                                      fontWeight: 'bold',
                                    },
                                  },
                                  {
                                    types: ['important'],
                                    style: {
                                      color: '#ff5555',
                                      fontWeight: 'bold',
                                    },
                                  },
                                  {
                                    types: ['support', 'builtin'],
                                    style: {
                                      color: '#ff79c6',
                                    },
                                  },
                                  {
                                    types: ['char'],
                                    style: {
                                      color: '#ff5555',
                                    },
                                  },
                                ],
                              }}
                              code={ukCode}
                              language="typescript"
                            >
                              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                <pre
                                  className={`${className} m-0 p-6 text-sm leading-relaxed font-mono min-w-fit`}
                                  style={{
                                    ...style,
                                    background: 'transparent',
                                    whiteSpace: 'pre',
                                    wordWrap: 'normal',
                                    overflowWrap: 'normal',
                                  }}
                                >
                                  {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })} className="relative whitespace-nowrap">
                                      <span className="inline-block w-8 text-right mr-4 text-white/40 select-none text-xs flex-shrink-0">
                                        {i + 1}
                                      </span>
                                      {line.map((token, key) => {
                                        const props = getTokenProps({ token });
                                        return (
                                          <span
                                            key={key}
                                            {...props}
                                            style={{
                                              ...props.style,
                                              textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                                            }}
                                          />
                                        );
                                      })}
                                    </div>
                                  ))}
                                </pre>
                              )}
                            </Highlight>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Dialog open={isModalOpen} onOpenChange={handleModalOpen}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-white text-gray-900 hover:bg-gray-50 px-4 py-2 text-sm font-medium rounded-lg shadow-sm hover:shadow transition-all"
                              >
                                Try Now
                              </Button>
                            </DialogTrigger>
                            <DialogContent
                              className={`${
                                proofs.length > 0
                                  ? isMobile
                                    ? 'w-full max-w-[95vw] h-[90vh] max-h-none'
                                    : 'w-[1200px]'
                                  : isMobile
                                  ? 'w-full max-w-[95vw] h-[85vh] max-h-none'
                                  : 'w-[896px]'
                              } max-w-none p-0 gap-0 ${isMobile ? 'overflow-y-auto' : ''}`}
                            >
                              <div className={`${isMobile ? 'p-4' : 'p-8'}`}>
                                <div className={`flex items-start justify-between ${isMobile ? 'mb-4' : 'mb-8'}`}>
                                  <div className="flex items-center gap-4">
                                    <div
                                      className={`${
                                        isMobile ? 'w-12 h-12' : 'w-16 h-16'
                                      } rounded-xl overflow-hidden bg-white border border-gray-100 p-2 flex items-center justify-center`}
                                    >
                                      <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/National_Health_Service_%28England%29_logo.svg/2560px-National_Health_Service_%28England%29_logo.svg.png"
                                        alt="NHS"
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div>
                                      <h2
                                        className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold text-gray-900`}
                                      >
                                        Prove your age with UK NHS Age Verification
                                      </h2>
                                      <p className={`mt-1 ${isMobile ? 'text-sm' : 'text-base'} text-gray-500`}>
                                        Prove your age in seconds. No screenshots. No uploads.
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`${isMobile ? 'flex flex-col gap-6' : 'flex gap-12'} ${
                                    isMobile ? 'min-h-[300px]' : 'min-h-[400px]'
                                  }`}
                                >
                                  {/* Left Side - Instructions */}
                                  <div className={`${isMobile ? 'w-full order-2' : 'flex-1 w-1/2'} space-y-8`}>
                                    <div>
                                      <h3
                                        className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-gray-900 ${
                                          isMobile ? 'mb-4' : 'mb-6'
                                        }`}
                                      >
                                        Follow these steps:
                                      </h3>
                                      <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
                                        {/* Update each step with mobile responsive styling */}
                                        <div className="flex items-start gap-4">
                                          <div
                                            className={`flex-shrink-0 ${
                                              isMobile ? 'w-8 h-8' : 'w-10 h-10'
                                            } rounded-full bg-primary/10 flex items-center justify-center`}
                                          >
                                            <Camera className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-primary`} />
                                          </div>
                                          <div>
                                            <p
                                              className={`font-medium text-gray-900 ${
                                                isMobile ? 'text-sm' : 'text-base'
                                              }`}
                                            >
                                              {isMobile ? 'Tap Button' : 'Scan QR Code'}
                                            </p>
                                            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>
                                              {isMobile
                                                ? 'Tap the button to start verification'
                                                : "Use your phone's camera to scan the QR code"}
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                          <div
                                            className={`flex-shrink-0 ${
                                              isMobile ? 'w-8 h-8' : 'w-10 h-10'
                                            } rounded-full bg-primary/10 flex items-center justify-center`}
                                          >
                                            <LogIn className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-primary`} />
                                          </div>
                                          <div>
                                            <p
                                              className={`font-medium text-gray-900 ${
                                                isMobile ? 'text-sm' : 'text-base'
                                              }`}
                                            >
                                              Login to NHS
                                            </p>
                                            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>
                                              Sign in to your account
                                            </p>
                                          </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                          <div
                                            className={`flex-shrink-0 ${
                                              isMobile ? 'w-8 h-8' : 'w-10 h-10'
                                            } rounded-full bg-primary/10 flex items-center justify-center`}
                                          >
                                            <Clock className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-primary`} />
                                          </div>
                                          <div>
                                            <p
                                              className={`font-medium text-gray-900 ${
                                                isMobile ? 'text-sm' : 'text-base'
                                              }`}
                                            >
                                              Wait for Verification
                                            </p>
                                            <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>
                                              We'll verify your age automatically
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right Side - QR Code/Button and Loading */}
                                  <div
                                    className={`${
                                      isMobile ? 'w-full order-1' : 'flex-1 w-1/2'
                                    } flex flex-col items-center justify-center space-y-8`}
                                  >
                                    {/* QR Code/Button section with mobile responsive sizing */}
                                    <div className="flex flex-col items-center">
                                      {proofs.length > 0 ? null : ( // Hide QR code when proofs are received
                                        <div className="bg-white p-4 rounded-xl shadow-sm">
                                          {loadingState.type === 'provider' && loadingState.step === 'generating' ? (
                                            // Show loading spinner while generating QR code
                                            <div className="w-[200px] h-[200px] flex items-center justify-center">
                                              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                            </div>
                                          ) : loadingState.type === 'verification' &&
                                            loadingState.step === 'waiting' ? (
                                            // Show loading spinner while waiting for verification
                                            <div className="w-[200px] h-[200px] flex items-center justify-center">
                                              <div className="flex flex-col items-center">
                                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                                                <p className="mt-4 text-sm text-gray-500">
                                                  Waiting for verification...
                                                </p>
                                              </div>
                                            </div>
                                          ) : requestUrl ? (
                                            // Check if mobile device
                                            /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
                                              navigator.userAgent.toLowerCase()
                                            ) ? (
                                              // Show button for mobile devices
                                              <div className="w-[200px] h-[200px] flex items-center justify-center">
                                                <Button
                                                  onClick={handleMobileVerification}
                                                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium"
                                                >
                                                  Open Verification
                                                </Button>
                                              </div>
                                            ) : (
                                              // Show QR code for desktop
                                              <QRCode
                                                size={200}
                                                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                                                value={requestUrl}
                                                viewBox={`0 0 200 200`}
                                              />
                                            )
                                          ) : (
                                            // Fallback placeholder
                                            <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 rounded">
                                              <span className="text-gray-400 text-sm">Generating QR...</span>
                                            </div>
                                          )}
                                        </div>
                                      )}

                                      {proofs.length > 0 ? null : ( // Hide scan instruction when proofs are received
                                        <p className="mt-4 text-sm text-gray-500">
                                          {loadingState.type === 'verification' && loadingState.step === 'waiting'
                                            ? 'Complete verification in the opened tab/app'
                                            : /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
                                                navigator.userAgent.toLowerCase()
                                              )
                                            ? 'Tap the button to start verification'
                                            : 'Scan the QR code to verify your credentials'}
                                        </p>
                                      )}

                                      <div className="mt-6">
                                        {proofs.length > 0 ? (
                                          // Show extracted parameters when proofs are received
                                          <div className="w-full">
                                            <div className="text-center mb-4">
                                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                              </div>
                                              <h3
                                                className={`${
                                                  isMobile ? 'text-base' : 'text-lg'
                                                } font-semibold text-gray-900`}
                                              >
                                                Verification Successful!
                                              </h3>
                                              <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>
                                                Your credentials have been verified
                                              </p>
                                            </div>

                                            {/* Display extracted parameters */}
                                            <div
                                              className={`bg-gray-50 rounded-lg p-4 ${
                                                isMobile ? 'max-h-[200px]' : 'max-h-[300px]'
                                              } overflow-y-auto`}
                                            >
                                              <h4
                                                className={`${
                                                  isMobile ? 'text-sm' : 'text-base'
                                                } font-medium text-gray-900 mb-3`}
                                              >
                                                Verified Information:
                                              </h4>
                                              <div className="text-sm">
                                                <JSONTree
                                                  data={getExtractedParameters(proofs[0])}
                                                  theme={{
                                                    scheme: 'bright',
                                                    author: 'chris kempson',
                                                    base00: '#000000',
                                                    base01: '#303030',
                                                    base02: '#505050',
                                                    base03: '#b0b0b0',
                                                    base04: '#d0d0d0',
                                                    base05: '#e0e0e0',
                                                    base06: '#f5f5f5',
                                                    base07: '#ffffff',
                                                    base08: '#fb0120',
                                                    base09: '#fc6d24',
                                                    base0A: '#fda331',
                                                    base0B: '#a1c659',
                                                    base0C: '#76c7b7',
                                                    base0D: '#6fb3d2',
                                                    base0E: '#d381c3',
                                                    base0F: '#be643c',
                                                  }}
                                                  invertTheme={false}
                                                  hideRoot={true}
                                                  shouldExpandNodeInitially={() => true}
                                                  labelRenderer={([key]) => (
                                                    <strong style={{ color: '#6fb3d2' }}>{key}:</strong>
                                                  )}
                                                  valueRenderer={(raw) => (
                                                    <span
                                                      style={{
                                                        fontSize: isMobile ? '12px' : '14px',
                                                        color: '#a1c659',
                                                        fontWeight: 'bold',
                                                      }}
                                                    >
                                                      {raw as string}
                                                    </span>
                                                  )}
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        ) : (
                                          // Show loading state while waiting for proofs
                                          <div>
                                            <div className="animate-pulse flex space-x-2 justify-center">
                                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                                              <div className="h-2 w-2 bg-primary rounded-full"></div>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">Waiting for proofs...</p>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {/* Status */}
                        <div
                          className="rounded-lg p-4 border border-white/20"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-emerald-400/20 flex items-center justify-center ring-1 ring-inset ring-emerald-400/30">
                              <CheckCircle className="h-4 w-4 text-emerald-300" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">Ready for UK Age Verification</div>
                              <div className="text-sm text-white/70">Compliant with latest regulations</div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="aus" className="mt-6 min-h-[380px]">
                        <div
                          className="rounded-lg p-8 text-center h-full flex flex-col items-center justify-center border border-white/20"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-white/80" />
                          </div>
                          <h3 className="text-lg font-medium text-white">Coming to Australia</h3>
                          <p className="text-sm text-white/70 mt-2 mb-6">Join the waitlist for early access</p>
                          <Button
                            onClick={() => {
                              window.open('https://form.typeform.com/to/JOCh5web', '_blank');
                            }}
                            size="sm"
                            className="bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:text-white px-4 py-2 text-sm font-medium rounded-lg backdrop-blur-sm"
                          >
                            Join Waitlist
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="us" className="mt-6 min-h-[380px]">
                        <div
                          className="rounded-lg p-8 text-center h-full flex flex-col items-center justify-center border border-white/20"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-white/80" />
                          </div>
                          <h3 className="text-lg font-medium text-white">Coming to United States</h3>
                          <p className="text-sm text-white/70 mt-2 mb-6">Join the waitlist for early access</p>
                          <Button
                            onClick={() => {
                              window.open('https://form.typeform.com/to/JOCh5web', '_blank');
                            }}
                            size="sm"
                            className="bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:text-white px-4 py-2 text-sm font-medium rounded-lg backdrop-blur-sm"
                          >
                            Join Waitlist
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="eu" className="mt-6 min-h-[380px]">
                        <div
                          className="rounded-lg p-8 text-center h-full flex flex-col items-center justify-center border border-white/20"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        >
                          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-white/80" />
                          </div>
                          <h3 className="text-lg font-medium text-white">Coming to Europe</h3>
                          <p className="text-sm text-white/70 mt-2 mb-6">Join the waitlist for early access</p>
                          <Button
                            size="sm"
                            className="bg-white/20 border border-white/30 text-white hover:bg-white/30 hover:text-white px-4 py-2 text-sm font-medium rounded-lg backdrop-blur-sm"
                          >
                            Join Waitlist
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who This Is For Section */}
          <section id="who-is-it-for" className="relative bg-white py-16 sm:py-20">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-y-0 right-1/2 translate-x-1/2 w-full overflow-hidden">
                <div className="absolute top-0 left-0 -translate-x-[60%] -translate-y-[40%] w-[120%] h-[180%] -rotate-12">
                  <div className="absolute inset-0 space-y-2 opacity-5">
                    {[...Array(40)].map((_, i) => (
                      <div key={i} className="h-2 bg-gray-500"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-gray-900">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">Who This is For</span>
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  If you need age verification, you need more than basic solutions.
                </h2>
              </div>
              <div className="mx-auto mt-16 max-w-5xl">
                <div className="grid gap-y-8 gap-x-12 lg:grid-cols-2">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-md"
                        style={{ backgroundColor: 'rgb(0, 0, 238)' }}
                      >
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Gaming Platforms</h3>
                        <p className="mt-2 text-base text-gray-600">
                          Verify players instantly without collecting sensitive data
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-md"
                        style={{ backgroundColor: 'rgb(0, 0, 238)' }}
                      >
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Social Media Apps</h3>
                        <p className="mt-2 text-base text-gray-600">Comply with digital safety regulations globally</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-md"
                        style={{ backgroundColor: 'rgb(0, 0, 238)' }}
                      >
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">DeFi & Crypto Platforms</h3>
                        <p className="mt-2 text-base text-gray-600">
                          Age-gate users while maintaining crypto privacy principles
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white shadow-md"
                        style={{ backgroundColor: 'rgb(0, 0, 238)' }}
                      >
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">E-commerce & Marketplaces</h3>
                        <p className="mt-2 text-base text-gray-600">
                          Verify age for restricted products without friction
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Card
                      className="w-full rounded-2xl text-white border-white/30 shadow-2xl"
                      style={{ backgroundColor: 'rgb(0, 0, 238)' }}
                    >
                      <CardHeader className="border-b border-white/20 pb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-emerald-400/20 ring-1 ring-emerald-400/30 flex items-center justify-center">
                              <Shield className="h-5 w-5 text-emerald-300" />
                            </div>
                            <div>
                              <CardTitle className="text-white text-lg">Privacy-first Age Checks</CardTitle>
                              <CardDescription className="text-white/70">UK Online Safety compliant</CardDescription>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                          >
                            Live
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm">
                            <div className="text-sm text-white/70">Accuracy</div>
                            <div className="mt-2 text-2xl font-semibold text-emerald-300">100%</div>
                            <div className="mt-3 h-2 w-full rounded-full bg-white/20">
                              <div className="h-2 w-full rounded-full bg-emerald-300"></div>
                            </div>
                          </div>

                          <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm">
                            <div className="text-sm text-white/70">Avg time</div>
                            <div className="mt-2 text-2xl font-semibold text-white">3-10s</div>
                            <div className="mt-3 h-2 w-full rounded-full bg-white/20">
                              <div className="h-2 w-full rounded-full bg-emerald-300"></div>
                            </div>
                          </div>

                          <div className="rounded-xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur-sm">
                            <div className="text-sm text-white/70">PII stored</div>
                            <div className="mt-2 text-2xl font-semibold text-white">0</div>
                            <div className="mt-3 text-sm text-white/70">Zero-knowledge proof</div>
                          </div>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm text-white/90">
                          <li className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-emerald-400/20 ring-1 ring-emerald-400/30 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-300" />
                            </span>
                            No personal data stored
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-emerald-400/20 ring-1 ring-emerald-400/30 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-300" />
                            </span>
                            Instant verification
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-emerald-400/20 ring-1 ring-emerald-400/30 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-300" />
                            </span>
                            Global regulation ready
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="bg-gray-50 py-16 sm:py-20">
            <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 text-gray-900">
                  <Zap className="h-5 w-5" />
                  <span className="text-sm font-medium uppercase tracking-wider">How It Works</span>
                </div>
                <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                  No setup. No data collection. Just instant verification.
                </h2>
              </div>
              <ul className="mx-auto mt-12 grid max-w-md grid-cols-1 gap-10 [counter-reset:steps] sm:mt-16 lg:mt-20 lg:max-w-5xl lg:grid-cols-4">
                <li className="flex-start group relative flex [counter-increment:steps] lg:flex-col">
                  <span
                    className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-200 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                    aria-hidden="true"
                  ></span>
                  <div
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-white group-hover:text-white shadow-md"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgb(0, 0, 238)';
                      e.currentTarget.style.borderColor = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                    }}
                  >
                    <div className="text-gray-600 group-hover:text-white">
                      <Copy className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-10">
                    <h3 className="text-lg font-semibold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 before:content-[counter(steps,decimal-leading-zero)]">
                      Install SDK
                    </h3>
                    <p className="mt-2 text-base text-gray-600 leading-relaxed">
                      Add our lightweight SDK to your app with a single npm install command
                    </p>
                  </div>
                </li>
                <li className="flex-start group relative flex [counter-increment:steps] lg:flex-col">
                  <span
                    className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-200 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                    aria-hidden="true"
                  ></span>
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-white group-hover:text-white">
                    <div className="text-gray-600 group-hover:text-white">
                      <Shield className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-10">
                    <h3 className="text-lg font-semibold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 before:content-[counter(steps,decimal-leading-zero)]">
                      User verification
                    </h3>
                    <p className="mt-2 text-base text-gray-600 leading-relaxed">
                      User proves their age using existing credentials without sharing personal data
                    </p>
                  </div>
                </li>
                <li className="flex-start group relative flex [counter-increment:steps] lg:flex-col">
                  <span
                    className="absolute left-[18px] top-14 h-[calc(100%_-_32px)] w-px bg-gray-200 lg:right-0 lg:left-auto lg:top-[18px] lg:h-px lg:w-[calc(100%_-_72px)]"
                    aria-hidden="true"
                  ></span>
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-white group-hover:text-white">
                    <div className="text-gray-600 group-hover:text-white">
                      <Brain className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-10">
                    <h3 className="text-lg font-semibold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 before:content-[counter(steps,decimal-leading-zero)]">
                      Cryptographic proof
                    </h3>
                    <p className="mt-2 text-base text-gray-600 leading-relaxed">
                      Zero-knowledge proof is generated confirming age without revealing identity
                    </p>
                  </div>
                </li>
                <li className="flex-start group relative flex [counter-increment:steps] lg:flex-col">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-white group-hover:text-white">
                    <div className="text-gray-600 group-hover:text-white">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-6 lg:ml-0 lg:mt-10">
                    <h3 className="text-lg font-semibold text-gray-900 before:mb-2 before:block before:font-mono before:text-sm before:text-gray-500 before:content-[counter(steps,decimal-leading-zero)]">
                      Instant verification
                    </h3>
                    <p className="mt-2 text-base text-gray-600 leading-relaxed">
                      Receive verified age confirmation and continue with your user flow
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <div className="mx-auto max-w-[1600px] py-16 sm:py-20 px-6">
            <div
              className="relative isolate overflow-hidden px-6 pt-12 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-16 lg:pt-0"
              style={{ backgroundColor: 'rgb(0, 0, 238)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5"></div>
              <div className="relative z-10 mx-auto w-full max-w-2xl text-center lg:py-20">
                <h2 className="text-4xl font-bold tracking-tight text-white">
                  Ready to Get Started with
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-cyan-300">
                    Age Verification?
                  </span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/90">
                  Join hundreds of companies already using Reclaim for privacy-preserving age verification.
                </p>
                <div className="mt-8 flex items-center justify-center gap-x-4">
                  <Button
                    onClick={() => {
                      window.open('https://app.reclaim.ai/m/subhash/clients', '_blank');
                    }}
                    size="lg"
                    className="bg-white text-gray-900 cursor-pointer hover:bg-gray-100 px-6 py-2 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Talk to Founder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-[1600px] px-6 py-12 md:py-16">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
                <div className="flex items-center gap-2">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-900"
                  >
                    <path d="M16 2L2 16L16 30L30 16L16 2Z" stroke="currentColor" strokeWidth="2"></path>
                    <path d="M16 8L24 16L16 24L8 16L16 8Z" fill="currentColor"></path>
                  </svg>
                  <span className="text-xl font-bold text-gray-900">Reclaim Age Verification</span>
                </div>
                <nav className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                  <a
                    href="https://reclaimprotocol.notion.site/Privacy-Policy-Reclaim-Protocol-115275b816cb80ab94b8ca8616673658"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="https://reclaimprotocol.notion.site/Terms-of-Service-Reclaim-Protocol-13c275b816cb80b1a5ade76c6f2532dd"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Terms of Service
                  </a>
                </nav>
              </div>
              <div className="flex flex-col gap-4 md:items-end">
                <div className="flex gap-4">
                  <a
                    href="https://twitter.com/reclaimprotocol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2.5 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/reclaimprotocol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gray-100 p-2.5 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t border-gray-200 pt-8 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-gray-500">© 2025 Reclaim Protocol. Privacy-first age verification.</p>
              <a
                href="https://twitter.com/reclaimprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                @reclaimprotocol
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
