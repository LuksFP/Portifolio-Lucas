import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, ArrowLeft, Lock, Mail, Sparkles } from 'lucide-react';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

// Email autorizado para acessar o admin
const ADMIN_EMAIL = 'lucas.kfrancopinheiro@gmail.com';

const authSchema = z.object({
  email: z.string().trim().email('Email inválido').max(255),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(100),
});

const Auth: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated, loading: authLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Verificar se é o email autorizado
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      toast({
        title: 'Acesso negado',
        description: 'Este email não tem permissão para acessar o admin.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    try {
      await signIn(email, password);
    } catch {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Verificar se é o email autorizado
    if (email.trim().toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      toast({
        title: 'Acesso negado',
        description: 'Este email não tem permissão para criar conta.',
        variant: 'destructive',
      });
      return;
    }
    
    setLoading(true);
    try {
      await signUp(email, password);
      setEmail('');
      setPassword('');
    } catch {
      // Error handled in hook
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(230,25%,8%)] via-[hsl(250,30%,12%)] to-[hsl(270,25%,10%)]">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-[hsl(var(--color-primary))] animate-spin" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-b-[hsl(var(--color-secondary))] animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background with gradient and effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(230,25%,8%)] via-[hsl(250,30%,12%)] to-[hsl(270,25%,10%)]" />
      
      {/* Animated orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[hsl(var(--color-primary)/0.15)] rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-[hsl(var(--color-secondary)/0.15)] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      {/* Back button */}
      <Button
        variant="ghost"
        className="absolute top-6 left-6 text-white/70 hover:text-white hover:bg-white/10 z-10"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </Button>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Card glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--color-primary)/0.5)] via-[hsl(var(--color-secondary)/0.5)] to-[hsl(var(--color-primary)/0.5)] rounded-2xl blur-xl opacity-30" />
        
        <div className="relative bg-[hsl(230,25%,12%)]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))] mb-4 shadow-lg shadow-[hsl(var(--color-primary)/0.3)]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Área Administrativa
            </h1>
            <p className="text-white/60 text-sm">
              Acesso restrito para gerenciamento
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/5 p-1 rounded-lg">
              <TabsTrigger 
                value="login" 
                className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--color-primary))] data-[state=active]:to-[hsl(var(--color-secondary))] data-[state=active]:text-white text-white/60 transition-all"
              >
                Login
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--color-primary))] data-[state=active]:to-[hsl(var(--color-secondary))] data-[state=active]:text-white text-white/60 transition-all"
              >
                Cadastro
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-white/80 text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-10 h-12 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-white/80 text-sm font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-10 pr-10 h-12 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))] hover:opacity-90 text-white font-semibold rounded-xl shadow-lg shadow-[hsl(var(--color-primary)/0.3)] transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Entrando...
                    </div>
                  ) : (
                    'Entrar'
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-white/80 text-sm font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-10 h-12 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-white/80 text-sm font-medium">
                    Senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pl-10 pr-10 h-12 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))] hover:opacity-90 text-white font-semibold rounded-xl shadow-lg shadow-[hsl(var(--color-primary)/0.3)] transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Cadastrando...
                    </div>
                  ) : (
                    'Cadastrar'
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
