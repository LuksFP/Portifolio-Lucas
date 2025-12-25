import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--color-primary))]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[hsl(var(--background))] p-4">
      <Button
        variant="ghost"
        className="absolute top-4 left-4 text-[hsl(var(--foreground))]"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </Button>

      <Card className="w-full max-w-md bg-[hsl(var(--card))] border-[hsl(var(--border))]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[hsl(var(--foreground))]">
            Admin
          </CardTitle>
          <CardDescription className="text-[hsl(var(--muted-foreground))]">
            Gerencie seus projetos do portfólio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-[hsl(var(--foreground))]">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-[hsl(var(--foreground))]">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--foreground))] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--btn-primary-bg))] hover:bg-[hsl(var(--btn-primary-hover))] text-[hsl(var(--btn-primary-text))]"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-[hsl(var(--foreground))]">
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-[hsl(var(--foreground))]">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mínimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[hsl(var(--muted))] border-[hsl(var(--border))] text-[hsl(var(--foreground))] pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--btn-primary-bg))] hover:bg-[hsl(var(--btn-primary-hover))] text-[hsl(var(--btn-primary-text))]"
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
