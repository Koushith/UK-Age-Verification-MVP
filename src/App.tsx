import { Button } from './components/ui/button';
import {
  CheckCircle,
  Shield,
  Zap,
  Copy,
  Rocket,
  Users,
  Building2,
  Globe,
  Wallet,
  Brain,
  Camera,
  LogIn,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { NavBar } from './components/navbar/NavBar';
import { HeroBenefits } from './components/hero/Hero';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { useState } from 'react';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { JSONTree } from 'react-json-tree';
import QRCode from 'react-qr-code';
import { useIsMobile } from './hooks/use-mobile';
import { ComingSoonTab, IndustryCard } from './components/coming-soon/ComingSoon';
import { Footer } from './components/footer/footer';
import { HowItWorksStep } from './components/how-it-works/HowItWorks';
import { Highlight } from 'prism-react-renderer';

// Header Component

// Hero Benefits Component

// Verification Steps Component
const VerificationSteps = ({ isMobile }: { isMobile: boolean }) => (
  <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
    <div className="flex items-start gap-4">
      <div
        className={`flex-shrink-0 ${
          isMobile ? 'w-8 h-8' : 'w-10 h-10'
        } rounded-full bg-primary/10 flex items-center justify-center`}
      >
        <Camera className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-primary`} />
      </div>
      <div>
        <p className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>
          {isMobile ? 'Tap Button' : 'Scan QR Code'}
        </p>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>
          {isMobile ? 'Tap the button to start verification' : "Use your phone's camera to scan the QR code"}
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
        <p className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>Login to NHS</p>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>Sign in to your account</p>
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
        <p className={`font-medium text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>Wait for Verification</p>
        <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>
          We'll verify your age automatically
        </p>
      </div>
    </div>
  </div>
);

// QR Code Section Component
const QRCodeSection = ({
  requestUrl,
  loadingState,
  proofs,
  //@ts-ignore
  isMobile,
  onMobileVerification,
}: {
  requestUrl: string | null;
  loadingState: { type: string; step: string };
  proofs: any[];
  isMobile: boolean;
  onMobileVerification: () => void;
}) => (
  <div className="flex flex-col items-center">
    {proofs.length > 0 ? null : (
      <div className="bg-white p-4 rounded-xl shadow-sm">
        {loadingState.type === 'provider' && loadingState.step === 'generating' ? (
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : loadingState.type === 'verification' && loadingState.step === 'waiting' ? (
          <div className="w-[200px] h-[200px] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-sm text-gray-500">Waiting for verification...</p>
            </div>
          </div>
        ) : requestUrl ? (
          /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ? (
            <div className="w-[200px] h-[200px] flex items-center justify-center">
              <Button
                onClick={onMobileVerification}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium"
              >
                Open Verification
              </Button>
            </div>
          ) : (
            <QRCode
              size={200}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={requestUrl}
              viewBox={`0 0 200 200`}
            />
          )
        ) : (
          <div className="w-[200px] h-[200px] flex items-center justify-center bg-gray-100 rounded">
            <span className="text-gray-400 text-sm">Generating QR...</span>
          </div>
        )}
      </div>
    )}

    {proofs.length > 0 ? null : (
      <p className="mt-4 text-sm text-gray-500">
        {loadingState.type === 'verification' && loadingState.step === 'waiting'
          ? 'Complete verification in the opened tab/app'
          : /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())
          ? 'Tap the button to start verification'
          : 'Scan the QR code to verify your credentials'}
      </p>
    )}
  </div>
);

// Verification Results Component
const VerificationResults = ({
  proofs,
  isMobile,
  getExtractedParameters,
}: {
  proofs: any[];
  isMobile: boolean;
  getExtractedParameters: (proof: any) => any;
}) => (
  <div className="mt-6">
    {proofs.length > 0 ? (
      <div className="w-full">
        <div className="text-center mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900`}>
            Verification Successful!
          </h3>
          <p className={`${isMobile ? 'text-sm' : 'text-base'} text-gray-500 mt-1`}>
            Your credentials have been verified
          </p>
        </div>

        <div className={`bg-gray-50 rounded-lg p-4 ${isMobile ? 'max-h-[200px]' : 'max-h-[300px]'} overflow-y-auto`}>
          <h4 className={`${isMobile ? 'text-sm' : 'text-base'} font-medium text-gray-900 mb-3`}>
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
              labelRenderer={([key]) => <strong style={{ color: '#6fb3d2' }}>{key}:</strong>}
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
);

// Coming Soon Tab Component

// Industry Card Component

// How It Works Step Component

const App = () => {
  const [requestUrl, setRequestUrl] = useState<string | null>(null);
  const [proofs, setProofs] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState({ type: 'none', step: 'none' });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const [selectedUKRegion, setSelectedUKRegion] = useState('UK');

  const getVerificationReq = async () => {
    setLoadingState({ type: 'provider', step: 'generating' });
    try {
      const APP_ID = import.meta.env.VITE_RECLAIM_APP_ID;
      const APP_SECRET = import.meta.env.VITE_RECLAIM_APP_SECRET;
      const PROVIDER_ID = '02394885-47b8-4a20-833d-0801ccccc9e4';

      const isMobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()) ||
        (typeof window.orientation !== 'undefined' ? window.orientation : -1) > -1;

      const isIOS = /mac|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()) || false;
      const deviceType = isMobile ? (isIOS ? 'ios' : 'android') : 'desktop';

      const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID, APP_SECRET, PROVIDER_ID, {
        device: deviceType,
        useAppClip: deviceType !== 'desktop',
      });

      const requestUrl = await reclaimProofRequest.getRequestUrl();
      console.log('Request URL:', requestUrl);
      setRequestUrl(requestUrl);
      setLoadingState({ type: 'none', step: 'none' });

      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          if (proofs) {
            if (typeof proofs === 'string') {
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
          setLoadingState({ type: 'none', step: 'none' });
        },
        onError: (error) => {
          console.error('Verification failed', error);
          setErrorMessage(error instanceof Error ? error.message.split(': ')[1] : 'An unknown error occurred');
          setLoadingState({ type: 'none', step: 'none' });
        },
      });
    } catch (error) {
      console.error('Error generating verification request:', error);
      setErrorMessage(error instanceof Error ? error.message.split(': ')[1] : 'An unknown error occurred');
      setLoadingState({ type: 'none', step: 'none' });
    }
  };

  const handleModalOpen = async (open: boolean) => {
    setIsModalOpen(open);
    if (open && !requestUrl) {
      await getVerificationReq();
    }
  };

  const handleMobileVerification = () => {
    setLoadingState({ type: 'verification', step: 'waiting' });
    window.open(requestUrl!, '_blank');
  };

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

  const ukCode = `import { ReclaimClient } from '@reclaimprotocol/js-sdk';
  
  const handleVerification = async () => {

  const APP_ID='0x71A6f91E69BDf0042ba9154B0f2e2730836e088F'
  const APP_SECRET='0x253ced133dc64537df17e1a5fee94f374d5a4075adbad954c0fc5fc0e3a12211'

    // checkout https://dev.reclaimprotocol.org/explore for more providers
    // const PROVIDER_ID='02394885-47b8-4a20-833d-0801ccccc9e4' (Wales NHS Age verification)
  const PROVIDER_ID='47b3843c-e0a1-4462-8461-77d22ad768aa' //(England NHS provider ID)
  
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

  console.log(errorMessage);

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

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
                  <HeroBenefits />
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
                        <div
                          className="rounded-lg overflow-hidden shadow-lg"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                        >
                          <div className="flex items-center justify-between px-4 py-2 border-b border-white/20">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-white/90 font-medium">Integration Code</span>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="flex items-center gap-1 px-3 py-1 rounded hover:bg-white/10 transition-colors text-xs text-white/80 border border-white/20">
                                    <span>{selectedUKRegion}</span>
                                    <ChevronDown className="w-3 h-3" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="start"
                                  className="min-w-[160px] bg-white border border-gray-200 shadow-lg"
                                >
                                  <DropdownMenuItem
                                    onClick={() => setSelectedUKRegion('UK England')}
                                    className="cursor-pointer"
                                  >
                                    <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 UK England</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => setSelectedUKRegion('UK Wales')}
                                    className="cursor-pointer"
                                  >
                                    <span>🏴󠁧󠁢󠁷󠁬󠁳󠁿 UK Wales</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => setSelectedUKRegion('UK North Ireland')}
                                    className="cursor-pointer"
                                  >
                                    <span>🇮🇪 UK North Ireland</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => setSelectedUKRegion('UK Scotland')}
                                    className="cursor-pointer"
                                  >
                                    <span>🏴󠁧󠁢󠁳󠁣󠁴󠁿 UK Scotland</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
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
                                      <VerificationSteps isMobile={isMobile} />
                                    </div>
                                  </div>

                                  {/* Right Side - QR Code/Button and Loading */}
                                  <div
                                    className={`${
                                      isMobile ? 'w-full order-1' : 'flex-1 w-1/2'
                                    } flex flex-col items-center justify-center space-y-8`}
                                  >
                                    <QRCodeSection
                                      requestUrl={requestUrl}
                                      loadingState={loadingState}
                                      proofs={proofs}
                                      isMobile={isMobile}
                                      onMobileVerification={handleMobileVerification}
                                    />

                                    <VerificationResults
                                      proofs={proofs}
                                      isMobile={isMobile}
                                      getExtractedParameters={getExtractedParameters}
                                    />
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
                        <ComingSoonTab country="Australia" waitlistUrl="https://form.typeform.com/to/JOCh5web" />
                      </TabsContent>

                      <TabsContent value="us" className="mt-6 min-h-[380px]">
                        <ComingSoonTab country="United States" waitlistUrl="https://form.typeform.com/to/JOCh5web" />
                      </TabsContent>

                      <TabsContent value="eu" className="mt-6 min-h-[380px]">
                        <ComingSoonTab country="Europe" />
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
                    <IndustryCard
                      icon={Building2}
                      title="Gaming Platforms"
                      description="Verify players instantly without collecting sensitive data"
                    />
                    <IndustryCard
                      icon={Globe}
                      title="Social Media Apps"
                      description="Comply with digital safety regulations globally"
                    />
                    <IndustryCard
                      icon={Wallet}
                      title="DeFi & Crypto Platforms"
                      description="Age-gate users while maintaining crypto privacy principles"
                    />
                    <IndustryCard
                      icon={Building2}
                      title="E-commerce & Marketplaces"
                      description="Verify age for restricted products without friction"
                    />
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
                <HowItWorksStep
                  icon={Copy}
                  title="Install SDK"
                  description="Add our lightweight SDK to your app with a single npm install command"
                />
                <HowItWorksStep
                  icon={Shield}
                  title="User verification"
                  description="User proves their age using existing credentials without sharing personal data"
                />
                <HowItWorksStep
                  icon={Brain}
                  title="Cryptographic proof"
                  description="Zero-knowledge proof is generated confirming age without revealing identity"
                />
                <HowItWorksStep
                  icon={CheckCircle}
                  title="Instant verification"
                  description="Receive verified age confirmation and continue with your user flow"
                  isLast
                />
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

      <Footer />
    </div>
  );
};

export default App;
