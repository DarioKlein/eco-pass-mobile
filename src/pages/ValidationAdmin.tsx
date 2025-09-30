import React, { useState, useEffect } from 'react'
import { getRecyclingItems, updateRecyclingItem, getUsers, saveUser } from '../utils/localStorage'
import { useAuth } from '../context/AuthContext'
import { RecyclingItem, User } from '../types'
import { CheckCircle, XCircle, Clock, Scale, Package, User as UserIcon } from 'lucide-react'

const ValidationAdmin: React.FC = () => {
  const { user: currentUser, updateUser } = useAuth()
  const [recyclingItems, setRecyclingItems] = useState<RecyclingItem[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')
  const [isProcessing, setIsProcessing] = useState<Record<string, boolean>>({})

  const materialTypes = [
    { value: 'plastic', label: 'Plástico', price: 1.0, icon: '♻️' },
    { value: 'paper', label: 'Papel', price: 0.8, icon: '📄' },
    { value: 'glass', label: 'Vidro', price: 0.5, icon: '🫙' },
    { value: 'metal', label: 'Metal', price: 2.0, icon: '🥫' },
    { value: 'electronics', label: 'Eletrônicos', price: 5.0, icon: '📱' },
  ]

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const items = getRecyclingItems()
    const allUsers = getUsers()
    setRecyclingItems(items)
    setUsers(allUsers)
  }

  const filteredItems = recyclingItems.filter(item => {
    if (filter === 'all') return true
    return item.status === filter
  })

  const handleApprove = async (item: RecyclingItem) => {
    setIsProcessing(prev => ({ ...prev, [item.id]: true }))

    try {
      // Update recycling item status
      updateRecyclingItem(item.id, { status: 'approved' })

      // Find and update user credits
      const user = users.find(u => u.id === item.userId)
      if (user) {
        const updatedUser = {
          ...user,
          credits: user.credits + item.estimatedValue,
          totalEarned: user.totalEarned + item.estimatedValue,
        }
        saveUser(updatedUser)

        // If the approved user is the current logged user, update the context too
        if (currentUser && currentUser.id === item.userId) {
          updateUser(updatedUser)
        }
      }

      loadData()
    } catch (error) {
      console.error('Error approving item:', error)
    } finally {
      setIsProcessing(prev => ({ ...prev, [item.id]: false }))
    }
  }

  const handleReject = async (item: RecyclingItem) => {
    setIsProcessing(prev => ({ ...prev, [item.id]: true }))

    try {
      updateRecyclingItem(item.id, { status: 'rejected' })
      loadData()
    } catch (error) {
      console.error('Error rejecting item:', error)
    } finally {
      setIsProcessing(prev => ({ ...prev, [item.id]: false }))
    }
  }

  const getUserById = (userId: string) => {
    return users.find(u => u.id === userId)
  }

  const getMaterialInfo = (type: RecyclingItem['type']) => {
    return materialTypes.find(m => m.value === type)
  }

  const getStatusColor = (status: RecyclingItem['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getStatusText = (status: RecyclingItem['status']) => {
    switch (status) {
      case 'approved':
        return 'Aprovado'
      case 'rejected':
        return 'Rejeitado'
      default:
        return 'Pendente'
    }
  }

  const pendingCount = recyclingItems.filter(item => item.status === 'pending').length
  const approvedCount = recyclingItems.filter(item => item.status === 'approved').length
  const rejectedCount = recyclingItems.filter(item => item.status === 'rejected').length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Validação de Reciclagens</h1>
          <p className="text-gray-600 mt-1">Interface para coletores aprovarem ou rejeitarem submissões</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Aprovados</p>
                <p className="text-2xl font-bold text-gray-900">{approvedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Rejeitados</p>
                <p className="text-2xl font-bold text-gray-900">{rejectedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-bold text-gray-900">{recyclingItems.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'pending', label: 'Pendentes', count: pendingCount },
              { value: 'approved', label: 'Aprovados', count: approvedCount },
              { value: 'rejected', label: 'Rejeitados', count: rejectedCount },
              { value: 'all', label: 'Todos', count: recyclingItems.length },
            ].map(filterOption => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === filterOption.value
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500">Nenhuma reciclagem encontrada para este filtro.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredItems.map(item => {
                const user = getUserById(item.userId)
                const material = getMaterialInfo(item.type)
                const isProcessingItem = isProcessing[item.id]

                return (
                  <div key={item.id} className="p-6 hover:bg-gray-50">
                    <div className="flex flex-col justify-between md:flex-row md:items-center">
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center space-x-4">
                          <span className="text-2xl">{material?.icon}</span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 -ml-3 md:ml-0">{material?.label}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1 -ml-3 md:ml-0">
                              <div className="flex items-center">
                                <Scale className="h-4 w-4 mr-1" />
                                {item.weight} kg
                              </div>
                              <div className="flex items-center">
                                <Package className="h-4 w-4 mr-1" />
                                {item.quantity} unidades
                              </div>
                              <div className="flex items-center">
                                <UserIcon className="h-4 w-4 mr-1 shrink-0" />

                                {/* Mobile: corta com 5 caracteres */}
                                <span className="block md:hidden text-xs">
                                  {user?.name
                                    ? user.name.length > 5
                                      ? user.name.substring(0, 12) + '...'
                                      : user.name
                                    : 'Usuário não encontrado'}
                                </span>

                                {/* Desktop: mostra completo */}
                                <span className="hidden md:block">{user?.name || 'Usuário não encontrado'}</span>
                              </div>
                            </div>
                            <p className=" flex text-sm text-gray-500 mt-1 pt-1 -ml-3 justify-start md:ml-0">
                              {new Date(item.date).toLocaleDateString('pt-BR')} às{' '}
                              {new Date(item.date).toLocaleTimeString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-start space-x-4 w-full md:w-auto md:items-center md:justify-end pt-1 md:pt-0">
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">R$ {item.estimatedValue.toFixed(2)}</p>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {getStatusText(item.status)}
                          </span>
                        </div>

                        {item.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(item)}
                              disabled={isProcessingItem}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isProcessingItem ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <CheckCircle className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => handleReject(item)}
                              disabled={isProcessingItem}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isProcessingItem ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <XCircle className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ValidationAdmin
