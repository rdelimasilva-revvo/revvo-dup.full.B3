import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const { signIn, error, isLoading } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    if (!email) return 'Informe seu e-mail';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Formato de e-mail invalido';
    return undefined;
  };

  const validatePassword = (password: string) => {
    if (!password) return 'Informe sua senha';
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailErr = validateEmail(formData.email);
    const passErr = validatePassword(formData.password);
    if (emailErr || passErr) {
      setFieldErrors({ email: emailErr, password: passErr });
      return;
    }
    setFieldErrors({});
    signIn(formData.email, formData.password);

    // Check auth result after signIn (zustand is sync here)
    const { user } = useAuthStore.getState();
    if (user) {
      navigate('/app/home');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with gradient background */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-left relative">
        <img
          src="https://ky4ov9pv1r.ufs.sh/f/vacIC1PeQNAlDswuZB88a7yWn6wgksjifxH4eGOmQR9DLvlN"
          alt="Background Pattern"
          className="absolute left-0 bottom-0 opacity-100"
        />
        <div className="text-white pl-48 pr-16 py-16 z-10 flex flex-col justify-center w-full">
          <img
            src="https://ky4ov9pv1r.ufs.sh/f/vacIC1PeQNAlhUNzEasnBIAxdQCj9eGRJluP31YK8vSzt2Wo"
            alt="Revvo Logo"
            className="w-40 h-auto mb-8"
          />
          <h1 className="font-onest text-[64px] leading-tight mb-4 font-bold tracking-normal">
            Olá, seja<br />bem-vindo!
          </h1>
          <p className="font-onest text-[20px] font-medium">
            A infratech inteligente para o crédito B2B
          </p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <img
            src="https://utfs.io/f/vacIC1PeQNAlsDXzKKbIVgqwomYfjGCaLMdyBkcWtsEPlr89"
            alt="Revvo Logo"
            className="h-12 mb-8 mx-auto"
          />
          <h2 className="text-2xl font-onest font-semibold text-center mb-8">Para iniciar, faça seu login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Insira seu E-mail"
                className={`w-full h-input px-6 border rounded-md focus:outline-none text-base font-onest ${
                  fieldErrors.email ? 'border-error focus:border-error' : 'border-gray-2 focus:border-revvo-blue'
                }`}
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                }}
                onBlur={() => {
                  if (formData.email) {
                    const err = validateEmail(formData.email);
                    if (err) setFieldErrors(prev => ({ ...prev, email: err }));
                  }
                }}
              />
              {fieldErrors.email && (
                <p className="mt-1 text-sm text-error font-onest">{fieldErrors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Insira sua Senha"
                className={`w-full h-input px-6 border rounded-md focus:outline-none text-base font-onest ${
                  fieldErrors.password ? 'border-error focus:border-error' : 'border-gray-2 focus:border-revvo-blue'
                }`}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-3" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-3" />
                )}
              </button>
              {fieldErrors.password && (
                <p className="mt-1 text-sm text-error font-onest">{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-sm text-gray-600 font-onest">Lembrar-me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-input bg-revvo-dark-blue text-white rounded-md hover:bg-opacity-90 transition-colors text-base font-onest font-semibold"
            >
              Entrar
            </button>
            {error && (
              <p className="mt-2 text-error text-sm">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
