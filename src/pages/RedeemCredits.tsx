import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveUser } from '../utils/localStorage';
import { TransportOption } from '../types';
import { CreditCard, Bus, Train, Navigation, Gift, ArrowRight } from 'lucide-react';

const RedeemCredits: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [selectedTransport, setSelectedTransport] = useState<TransportOption | null>(null);
  const [credits, setCredits] = useState('');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const transportOptions: TransportOption[] = [
    {
      id: 'bus',
      type: 'bus',
      name: 'Ônibus Urbano',
      pricePerCredit: 1.0,
      icon: '🚌',
    },
    {
      id: 'metro',
      type: 'metro',
      name: 'Metrô',
      pricePerCredit: 1.5,
      icon: '🚇',
    },
    {
      id: 'train',
      type: 'train',
      name: 'Trem',
      pricePerCredit: 2.0,
      icon: '🚆',
    },
  ];

  const calculatePassages = () => {
    if (!selectedTransport || !credits) return 0;
    return Math.floor(parseFloat(credits) / selectedTransport.pricePerCredit);
  };

  const handleRedeem = async () => {
    if (!user || !selectedTransport || !credits) return;

    const creditsToRedeem = parseFloat(credits);
    if (creditsToRedeem > user.credits) return;

    setIsRedeeming(true);

    try {
      const newCredits = user.credits - creditsToRedeem;
      const newTotalRedeemed = user.totalRedeemed + creditsToRedeem;
      
      const updatedUser = {
        ...user,
        credits: newCredits,
        totalRedeemed: newTotalRedeemed,
      };

      updateUser(updatedUser);
      saveUser(updatedUser);

      setCredits('');
      setSelectedTransport(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error redeeming credits:', error);
    } finally {
      setIsRedeeming(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resgatar Créditos</h1>
          <p className="text-gray-600 mt-1">
            Troque seus créditos por passagens de transporte público
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            ✅ Créditos resgatados com sucesso! Suas passagens foram creditadas.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Balance */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">Saldo Atual</h2>
                  <div className="text-3xl font-bold text-primary-600">
                    R$ {user.credits.toFixed(2)}
                  </div>
                  <p className="text-gray-600 text-sm mt-1">Disponível para resgate</p>
                </div>
                <CreditCard className="h-12 w-12 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Transport Options */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Escolha o Transporte</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {transportOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedTransport(option)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedTransport?.id === option.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{option.icon}</div>
                      <h4 className="font-semibold text-gray-900 text-sm">{option.name}</h4>
                      <p className="text-gray-600 text-xs mt-1">
                        R$ {option.pricePerCredit.toFixed(2)}/passagem
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {selectedTransport && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="credits" className="block text-sm font-medium text-gray-700 mb-2">
                      Valor a resgatar (R$)
                    </label>
                    <input
                      id="credits"
                      type="number"
                      step="0.1"
                      min="0"
                      max={user.credits}
                      value={credits}
                      onChange={(e) => setCredits(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder={`Máximo: R$ ${user.credits.toFixed(2)}`}
                    />
                  </div>

                  {credits && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-blue-900">Você receberá:</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {calculatePassages()} passagem{calculatePassages() !== 1 ? 's' : ''}
                          </p>
                          <p className="text-blue-700 text-sm">
                            {selectedTransport.name}
                          </p>
                        </div>
                        <ArrowRight className="h-8 w-8 text-blue-500" />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleRedeem}
                    disabled={isRedeeming || !credits || parseFloat(credits) > user.credits || parseFloat(credits) <= 0}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRedeeming ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Resgatando...
                      </div>
                    ) : (
                      'Resgatar Créditos'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo da Conta</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Total Ganho</span>
                  <span className="font-semibold text-green-600">
                    R$ {user.totalEarned.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-gray-600">Total Resgatado</span>
                  <span className="font-semibold text-blue-600">
                    R$ {user.totalRedeemed.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Saldo Atual</span>
                  <span className="font-semibold text-primary-600">
                    R$ {user.credits.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">💡 Dica</h4>
                <p className="text-gray-600 text-sm">
                  Recicle mais materiais para ganhar mais créditos e economizar no transporte público!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemCredits;