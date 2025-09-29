import React from 'react';
import { useAuth } from '../context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { CreditCard, Info, MapPin, Clock, Recycle } from 'lucide-react';

const MyCard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const acceptedMaterials = [
    { type: 'Plástico', description: 'Garrafas PET, embalagens, sacolas', icon: '♻️' },
    { type: 'Papel', description: 'Jornais, revistas, caixas de papelão', icon: '📄' },
    { type: 'Vidro', description: 'Garrafas, potes, recipientes', icon: '🫙' },
    { type: 'Metal', description: 'Latas de alumínio, ferro, cobre', icon: '🥫' },
    { type: 'Eletrônicos', description: 'Celulares, pilhas, componentes', icon: '📱' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Meu Cartão Digital</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Apresente este cartão nos pontos de coleta para ganhar créditos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Digital Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-green-500 h-fit">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">EcoPass</h2>
                  <p className="text-primary-100 text-sm">Cartão de Reciclagem</p>
                </div>
                <CreditCard className="h-8 w-8 text-primary-200" />
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="text-center mb-6">
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg inline-block">
                  <QRCodeSVG
                    value={`${user.cpf}-${user.id}`}
                    size={150}
                    className="mx-auto w-full max-w-[150px] h-auto"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 font-medium">NOME COMPLETO</p>
                  <p className="text-lg font-semibold text-gray-900">{user.name}</p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 font-medium">CPF</p>
                  <p className="text-lg font-semibold text-gray-900">{user.cpf}</p>
                </div>

                <div className="border-b pb-4">
                  <p className="text-sm text-gray-500 font-medium">ID DO USUÁRIO</p>
                  <p className="text-lg font-semibold text-gray-900">{user.id}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">SALDO ATUAL</p>
                  <p className="text-2xl font-bold text-primary-600">R$ {user.credits.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions and Info */}
          <div className="space-y-6">
            {/* How to Use */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Info className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Como Usar</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Separe os materiais</p>
                    <p className="text-gray-600 text-sm">Organize seus recicláveis por tipo e peso</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Vá ao ponto de coleta</p>
                    <p className="text-gray-600 text-sm">Encontre o ponto mais próximo de você</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Apresente este QR Code</p>
                    <p className="text-gray-600 text-sm">O coletor irá escanear e validar seus materiais</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Receba seus créditos</p>
                    <p className="text-gray-600 text-sm">Após validação, os créditos aparecem no seu saldo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accepted Materials */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Recycle className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="text-xl font-semibold text-gray-900">Materiais Aceitos</h3>
              </div>

              <div className="space-y-3">
                {acceptedMaterials.map((material, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl mr-3">{material.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900">{material.type}</p>
                      <p className="text-gray-600 text-sm">{material.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">💡 Dicas para Reciclagem</h4>
              <ul className="space-y-2 text-green-800 text-sm">
                <li>• Lave embalagens antes de levar aos pontos de coleta</li>
                <li>• Remova etiquetas e tampas quando possível</li>
                <li>• Separe materiais por tipo para facilitar a pesagem</li>
                <li>• Quanto mais você reciclar, mais créditos ganha!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default MyCard;