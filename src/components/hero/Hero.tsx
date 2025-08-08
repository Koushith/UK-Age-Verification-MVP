import { Copy, Database, DollarSign, Heart, ShieldCheck, Timer } from 'lucide-react';
import { Highlight } from 'prism-react-renderer';
import { Button } from '../ui/button';
export const HeroBenefits = () => (
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
);

// Code Block Component
export const CodeBlock = ({ code }: { code: string }) => (
  <div className="rounded-lg overflow-hidden shadow-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
    <div className="flex items-center justify-between px-4 py-2 border-b border-white/20">
      <span className="text-sm text-white/90 font-medium">Integration Code</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigator.clipboard.writeText(code)}
        className="text-white/80 hover:text-white hover:bg-white/20 text-sm"
      >
        <Copy className="h-3 w-3 mr-1" />
        <span>Copy</span>
      </Button>
    </div>
    <div className="overflow-x-auto overflow-y-hidden" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
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
        code={code}
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
);
