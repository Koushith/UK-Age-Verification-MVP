import { Button } from './components/ui/button';
import { CheckCircle, Shield, Zap, Copy, Menu, Rocket, Users, Building2, Globe, Wallet, Brain } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Highlight, themes } from 'prism-react-renderer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';

const App = () => {
  const ukCode = `import { ReclaimClient } from '@reclaimprotocol/js-sdk';

// Initialize Reclaim for UK age verification
const reclaim = new ReclaimClient({
  region: 'uk',
  apiKey: 'YOUR_API_KEY'
});

// Start verification
const result = await reclaim.verifyAge({
  minAge: 18,
  onSuccess: (proof) => console.log('✅ Age verified!'),
  onError: (error) => console.error('❌ Failed:', error)
});`;

  // extremely small, dependency-free highlighter for demo purposes

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <nav className="mx-auto max-w-7xl px-6 h-20">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <a href="/">
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
                  <span className="text-xl font-bold text-gray-900">Reclaim Protocol</span>
                </div>
              </a>
            </div>
            <div className="hidden lg:flex lg:items-center lg:gap-x-10">
              <a
                href="#features"
                className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#who-is-it-for"
                className="text-[15px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Who is it For
              </a>
            </div>
            <div className="lg:hidden">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-gray-900">
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
          <section className="relative overflow-hidden bg-gray-950 pt-40 pb-32 sm:pt-48 sm:pb-40">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute h-full w-full bg-[radial-gradient(circle_at_top_right,theme(colors.gray.800/0.15),transparent_50%)]"></div>
              <div className="absolute h-full w-full bg-[radial-gradient(circle_at_40%_60%,theme(colors.gray.700/0.1),transparent_30%)]"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-col gap-20 lg:flex-row lg:items-center lg:gap-24">
                <div className="flex-1 space-y-8">
                  <div className="space-y-6">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      The Easiest Way to Verify Ages with Zero-Knowledge Privacy
                    </h1>
                    <p className="text-lg text-gray-400 leading-relaxed">
                      Comply with global age verification regulations while protecting User Privacy
                    </p>
                  </div>
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <Button
                      onClick={() => {
                        window.open('https://app.reclaim.ai/m/subhash/clients', '_blank');
                      }}
                      className="bg-white text-gray-900 hover:bg-gray-200 font-medium transition-colors group cursor-pointer"
                    >
                      <Rocket className="mr-2 h-4 w-4" />
                      Book a Demo
                    </Button>
                  </div>
                  <div className="mt-16 flex flex-wrap items-center gap-4">
                    <div className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-700/50 px-5 py-2 ring-1 ring-gray-700 transition-all hover:ring-gray-500">
                      <span className="rounded-full bg-gray-800 p-1.5 text-white ring-1 ring-gray-700 group-hover:text-white">
                        <Shield className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-gray-100">Privacy preserving</span>
                    </div>
                    <div className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-700/50 px-5 py-2 ring-1 ring-gray-700 transition-all hover:ring-gray-500">
                      <span className="rounded-full bg-gray-800 p-1.5 text-white ring-1 ring-gray-700 group-hover:text-white">
                        <Globe className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-gray-100">Global Compliant</span>
                    </div>
                    <div className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-gray-800/80 to-gray-700/50 px-5 py-2 ring-1 ring-gray-700 transition-all hover:ring-gray-500">
                      <span className="rounded-full bg-gray-800 p-1.5 text-white ring-1 ring-gray-700 group-hover:text-white">
                        <Zap className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-gray-100">Instant verification</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                    <Tabs defaultValue="uk" className="w-full">
                      <TabsList className="inline-flex w-full items-center justify-start bg-gray-800/50 p-1 rounded-lg gap-1 overflow-x-auto whitespace-nowrap">
                        <TabsTrigger
                          value="uk"
                          className="rounded-md px-3 py-1.5 text-[14px] font-medium transition-colors text-gray-400 hover:text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                        >
                          <span>🇬🇧 United Kingdom</span>
                          <span className="text-[12px] text-emerald-400 ml-2">Live</span>
                        </TabsTrigger>

                        <TabsTrigger
                          value="us"
                          className="rounded-md px-3 py-1.5 text-[14px] font-medium transition-colors text-gray-400 hover:text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                        >
                          <span>🇺🇸 United States</span>
                          <span className="text-[12px] text-gray-500 ml-2">Coming Soon</span>
                        </TabsTrigger>

                        <TabsTrigger
                          value="eu"
                          className="rounded-md px-3 py-1.5 text-[14px] font-medium transition-colors text-gray-400 hover:text-white data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                        >
                          <span>🇪🇺 Europe</span>
                          <span className="text-[12px] text-gray-500 ml-2">Coming Soon</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="uk" className="mt-6 space-y-6 min-h-[380px]">
                        {/* Code Block */}
                        <div className="rounded-lg bg-gray-800/50 overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
                            <span className="text-[13px] text-gray-400">Integration Code</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigator.clipboard.writeText(ukCode)}
                              className="text-gray-300 hover:text-white text-xs"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              <span>Copy</span>
                            </Button>
                          </div>
                          <div className="p-0 bg-gray-900/50">
                            <Highlight theme={themes.vsDark} code={ukCode} language="ts">
                              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                <pre
                                  className={`${className} m-0 p-4 text-xs leading-relaxed`}
                                  style={{ ...style, background: 'transparent' }}
                                >
                                  {tokens.map((line, i) => (
                                    <div key={i} {...getLineProps({ line })}>
                                      {line.map((token, key) => (
                                        <span key={key} {...getTokenProps({ token })} />
                                      ))}
                                    </div>
                                  ))}
                                </pre>
                              )}
                            </Highlight>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Button
                            size="sm"
                            className="bg-white text-gray-900 hover:bg-gray-50 px-4 py-2 text-[13px] font-medium rounded-lg shadow-sm hover:shadow transition-all"
                          >
                            Try Now
                          </Button>
                        </div>

                        {/* Status */}
                        <div className="rounded-lg bg-gray-800/50 p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center ring-1 ring-inset ring-emerald-500/20">
                              <CheckCircle className="h-4 w-4 text-emerald-400" />
                            </div>
                            <div>
                              <div className="text-[14px] font-medium text-white">Ready for UK Age Verification</div>
                              <div className="text-[13px] text-gray-400">Compliant with latest regulations</div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="us" className="mt-6 min-h-[380px]">
                        <div className="rounded-lg bg-gray-800/50 p-8 text-center h-full flex flex-col items-center justify-center">
                          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-white">Coming to United States</h3>
                          <p className="text-[14px] text-gray-400 mt-2 mb-6">Join the waitlist for early access</p>
                          <Button
                            size="sm"
                            className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-4 py-2 text-[13px] font-medium rounded-lg"
                          >
                            Join Waitlist
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="eu" className="mt-6 min-h-[380px]">
                        <div className="rounded-lg bg-gray-800/50 p-8 text-center h-full flex flex-col items-center justify-center">
                          <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-700/50 flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-medium text-white">Coming to Europe</h3>
                          <p className="text-[14px] text-gray-400 mt-2 mb-6">Join the waitlist for early access</p>
                          <Button
                            size="sm"
                            className="bg-gray-800 text-gray-300 hover:bg-gray-700 px-4 py-2 text-[13px] font-medium rounded-lg"
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
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Gaming Platforms</h3>
                        <p className="mt-2 text-base text-gray-600">
                          Verify players instantly without collecting sensitive data
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Social Media Apps</h3>
                        <p className="mt-2 text-base text-gray-600">Comply with digital safety regulations globally</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                        <Wallet className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">DeFi & Crypto Platforms</h3>
                        <p className="mt-2 text-base text-gray-600">
                          Age-gate users while maintaining crypto privacy principles
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
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
                    <Card className="w-full rounded-2xl bg-gray-900 text-white border-gray-800 shadow-lg">
                      <CardHeader className="border-b border-white/10 pb-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30 flex items-center justify-center">
                              <Shield className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div>
                              <CardTitle className="text-white text-lg">Privacy-first Age Checks</CardTitle>
                              <CardDescription className="text-gray-400">UK Online Safety compliant</CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-white/10 text-white border-white/10">
                            Live
                          </Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-6">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                            <div className="text-xs text-gray-400">Accuracy</div>
                            <div className="mt-2 text-2xl font-semibold text-emerald-400">100%</div>
                            <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                              <div className="h-2 w-full rounded-full bg-emerald-400/80"></div>
                            </div>
                          </div>

                          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                            <div className="text-xs text-gray-400">Avg time</div>
                            <div className="mt-2 text-2xl font-semibold text-white">3-10s</div>
                            <div className="mt-3 h-2 w-full rounded-full bg-white/10">
                              <div className="h-2 w-full rounded-full bg-emerald-400/80"></div>
                            </div>
                          </div>

                          <div className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                            <div className="text-xs text-gray-400">PII stored</div>
                            <div className="mt-2 text-2xl font-semibold text-white">0</div>
                            <div className="mt-3 text-[11px] text-gray-400">Zero-knowledge proof</div>
                          </div>
                        </div>

                        <ul className="mt-6 space-y-3 text-sm text-gray-300">
                          <li className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                            </span>
                            No personal data stored
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                            </span>
                            Instant verification
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/30 flex items-center justify-center">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
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
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
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
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
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
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all duration-200 group-hover:border-gray-900 group-hover:bg-gray-900">
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
          <div className="mx-auto max-w-7xl py-16 sm:py-20 px-6">
            <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-12 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-16 lg:pt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
              <div className="relative z-10 mx-auto w-full max-w-2xl text-center lg:py-20">
                <h2 className="text-4xl font-bold tracking-tight text-white">
                  Ready to Get Started with
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                    Age Verification?
                  </span>
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-300">
                  Join hundreds of companies already using Reclaim for privacy-preserving age verification.
                </p>
                <div className="mt-8 flex items-center justify-center gap-x-4">
                  <Button
                    onClick={() => {
                      window.open('https://cal.com/reclaimprotocol/30min', '_blank');
                    }}
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-50 px-6 py-2 text-[15px] font-medium rounded-lg shadow-sm hover:shadow transition-all"
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
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
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
                  <span className="text-xl font-bold text-gray-900">Reclaim Protocol</span>
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
