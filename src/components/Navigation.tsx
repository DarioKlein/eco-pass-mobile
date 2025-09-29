import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Home, CreditCard, Plus, Gift, CheckSquare, LogOut, Menu, X, Recycle } from 'lucide-react'

const Navigation: React.FC = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/my-card', label: 'Meu Cartão', icon: CreditCard },
    { path: '/new-recycling', label: 'Nova Reciclagem', icon: Plus },
    { path: '/redeem-credits', label: 'Resgatar Créditos', icon: Gift },
    { path: '/validation', label: 'Validação Admin', icon: CheckSquare },
  ]

  const isActivePath = (path: string) => location.pathname === path

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                <Recycle className="h-5 w-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">EcoPass</h1>
                <p className="text-xs text-gray-500">Sustentabilidade em Créditos</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map(item => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActivePath(item.path)
                        ? 'bg-primary-100 text-primary-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        isActivePath(item.path) ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* User Info */}
          {user && (
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                    <p className="text-xs text-gray-500">R$ {user.credits.toFixed(2)} disponível</p>
                  </div>
                  <button onClick={handleLogout} className="ml-3 p-2 text-gray-400 hover:text-gray-600" title="Sair">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 safe-area-inset-bottom shadow-lg">
        <nav className="flex">
          {navigationItems.map(item => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors ${
                  isActivePath(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-500 hover:text-gray-700 active:bg-gray-100'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActivePath(item.path) ? 'text-primary-600' : 'text-gray-500'}`} />
                <span className="block lg:hidden text-[10px] mt-1 font-medium leading-tight text-center">
                  {item.label === 'Meu Cartão'
                    ? 'Cartão'
                    : item.label === 'Resgatar Créditos'
                    ? 'Resgatar'
                    : item.label === 'Validação Admin'
                    ? 'Admin'
                    : item.label === 'Nova Reciclagem'
                    ? 'Reciclar'
                    : item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* User info bar */}
        {user && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 truncate">{user.name}</p>
                <p className="text-xs text-gray-500">R$ {user.credits.toFixed(2)} disponível</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-3 p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Navigation
