import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useProjects, ProjectInput, Project } from '@/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Pencil, Trash2, Github, ExternalLink, LogOut, FolderOpen, Sparkles, Image, Link } from 'lucide-react';

// Email autorizado para acessar o admin
const ADMIN_EMAIL = 'lucas.kfrancopinheiro@gmail.com';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading, signOut } = useAuth();
  const { projects, loading, createProject, updateProject, deleteProject } = useProjects();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isAdmin = user?.email === ADMIN_EMAIL;
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectInput>({
    title: '',
    description: '',
    image_url: '',
    github_url: '',
    demo_url: '',
    tech_stack: [],
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        navigate('/auth');
      } else if (!isAdmin) {
        // Usuário logado mas não é o admin
        navigate('/');
      }
    }
  }, [isAuthenticated, authLoading, isAdmin, navigate]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      github_url: '',
      demo_url: '',
      tech_stack: [],
    });
    setTechInput('');
    setEditingProject(null);
  };

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        description: project.description,
        image_url: project.image_url || '',
        github_url: project.github_url || '',
        demo_url: project.demo_url || '',
        tech_stack: project.tech_stack || [],
      });
      setTechInput(project.tech_stack?.join(', ') || '');
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData: ProjectInput = {
      ...formData,
      tech_stack: techInput.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectData);
      } else {
        await createProject(projectData);
      }
      setIsDialogOpen(false);
      resetForm();
    } catch {
      // Error handled in hook
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      await deleteProject(id);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || loading) {
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[hsl(230,25%,8%)] via-[hsl(250,30%,12%)] to-[hsl(270,25%,10%)]" />
      
      {/* Animated orbs */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-[hsl(var(--color-primary)/0.1)] rounded-full blur-3xl" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-[hsl(var(--color-secondary)/0.1)] rounded-full blur-3xl" />
      
      {/* Grid pattern */}
      <div className="fixed inset-0 opacity-[0.03]" style={{ 
        backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft size={20} className="mr-2" />
                Voltar
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))] shadow-lg shadow-[hsl(var(--color-primary)/0.3)]">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">
                    Gerenciar Projetos
                  </h1>
                  <p className="text-white/50 text-sm">{projects.length} projeto(s) cadastrado(s)</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))] hover:opacity-90 text-white font-medium shadow-lg shadow-[hsl(var(--color-primary)/0.3)] rounded-xl"
                  >
                    <Plus size={20} className="mr-2" />
                    Novo Projeto
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[hsl(230,25%,12%)]/95 backdrop-blur-xl border-white/10 max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-white text-xl flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-[hsl(var(--color-primary))]" />
                      {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-5 mt-4">
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm font-medium">Título *</Label>
                      <Input
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Nome do projeto"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm font-medium">Descrição *</Label>
                      <Textarea
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descreva o projeto..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))] resize-none"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        URL do Arquivo (imagem, vídeo, etc.)
                      </Label>
                      <Input
                        value={formData.image_url}
                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                        placeholder="https://exemplo.com/arquivo.png"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                      />
                      <p className="text-white/40 text-xs">Aceita qualquer tipo de arquivo (imagem, vídeo, GIF, etc.)</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub URL
                      </Label>
                      <Input
                        value={formData.github_url}
                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                        placeholder="https://github.com/usuario/repo"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm font-medium flex items-center gap-2">
                        <Link className="w-4 h-4" />
                        Demo URL (Deploy)
                      </Label>
                      <Input
                        value={formData.demo_url}
                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                        placeholder="https://meu-projeto.vercel.app"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm font-medium">Tecnologias (separadas por vírgula)</Label>
                      <Input
                        value={techInput}
                        onChange={(e) => setTechInput(e.target.value)}
                        placeholder="React, TypeScript, Tailwind..."
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-11 rounded-xl focus:border-[hsl(var(--color-primary))] focus:ring-1 focus:ring-[hsl(var(--color-primary))]"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-xl h-11"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))] hover:opacity-90 text-white font-medium rounded-xl h-11"
                      >
                        {editingProject ? 'Salvar' : 'Criar'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
              >
                <LogOut size={20} />
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(var(--color-primary)/0.3)] to-[hsl(var(--color-secondary)/0.3)] rounded-3xl blur-xl opacity-50" />
              <Card className="relative bg-[hsl(230,25%,12%)]/80 backdrop-blur-xl border-white/10 rounded-2xl">
                <CardContent className="flex flex-col items-center justify-center py-20">
                  <div className="p-4 rounded-2xl bg-white/5 mb-6">
                    <FolderOpen className="w-12 h-12 text-white/30" />
                  </div>
                  <p className="text-white/50 mb-6 text-lg">
                    Nenhum projeto cadastrado ainda.
                  </p>
                  <Button
                    onClick={() => handleOpenDialog()}
                    className="bg-gradient-to-r from-[hsl(var(--color-primary))] to-[hsl(var(--color-secondary))] hover:opacity-90 text-white font-medium shadow-lg shadow-[hsl(var(--color-primary)/0.3)] rounded-xl"
                  >
                    <Plus size={20} className="mr-2" />
                    Adicionar Primeiro Projeto
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div key={project.id} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--color-primary)/0.3)] to-[hsl(var(--color-secondary)/0.3)] rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Card className="relative bg-[hsl(230,25%,12%)]/80 backdrop-blur-xl border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
                    {project.image_url && (
                      <div className="aspect-video overflow-hidden bg-white/5">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            // Fallback for non-image files
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-white font-semibold">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-white/60 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {project.tech_stack && project.tech_stack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-xs rounded-lg bg-white/5 text-white/70 border border-white/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 pt-2">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <Github size={18} />
                          </a>
                        )}
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-white/5 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                        <div className="flex-1" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(project)}
                          className="p-2 h-auto text-white/50 hover:text-white hover:bg-white/10 rounded-lg"
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id)}
                          className="p-2 h-auto text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
