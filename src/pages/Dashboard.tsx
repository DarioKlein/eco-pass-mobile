import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { TrendingUp, CreditCard, Plus, Gift } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Bem-vindo, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Acompanhe seu saldo, submissões e histórico de reciclagem
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Stats and Actions */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Credits Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Saldo Disponível</h2>
                <CreditCard className="h-6 w-6 text-primary-600" />
              </div>
              <div className="text-3xl font-bold text-primary-600 mb-2">
                R$ {user.credits.toFixed(2)}
              </div>
              <p className="text-gray-600 text-sm mb-4">
                + R$ 1.60 pendente
              </p>
              <Link to="/redeem-credits" className="block w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors text-center">
                Resgatar Créditos
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Ganho</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {user.totalEarned.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex items-center">
                  <Gift className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Resgatado</p>
                    <p className="text-2xl font-bold text-gray-900">R$ {user.totalRedeemed.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900">Plástico - 2.5kg</p>
                      <p className="text-sm text-gray-500">19/01/2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Validado
                    </span>
                    <p className="text-sm text-gray-900 mt-1">R$ 2.50</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/new-recycling" className="bg-primary-600 text-white p-4 sm:p-6 rounded-lg hover:bg-primary-700 transition-colors text-left block">
                <Plus className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-lg">Nova Reciclagem</h3>
                <p className="text-primary-100 text-sm">Registre seus materiais</p>
              </Link>
              
              <Link to="/redeem-credits" className="bg-blue-600 text-white p-4 sm:p-6 rounded-lg hover:bg-blue-700 transition-colors text-left block">
                <Gift className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-lg">Resgatar Créditos</h3>
                <p className="text-blue-100 text-sm">Troque por transporte</p>
              </Link>
            </div>
          </div>

          {/* Right Column - QR Card */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:sticky lg:top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seu Cartão Digital</h3>
              <p className="text-gray-600 text-sm mb-6">
                Apresente este QR code nos pontos de coleta
              </p>
              
              <div className="text-center">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4">
                  <QRCodeSVG
                    value={`${user.cpf}-${user.id}`}
                    size={160}
                    className="mx-auto w-full max-w-[160px] h-auto"
                  />
                </div>
                
                <div className="text-left space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Nome:</span> {user.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">CPF:</span> {user.cpf}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">ID:</span> {user.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;