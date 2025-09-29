export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  credits: number;
  totalEarned: number;
  totalRedeemed: number;
}

export interface RecyclingItem {
  id: string;
  userId: string;
  type: 'plastic' | 'paper' | 'glass' | 'metal' | 'electronics';
  weight: number;
  quantity: number;
  estimatedValue: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  collectorId?: string;
}

export interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  hours: string;
  acceptedMaterials: string[];
  distance?: number;
}

export interface TransportOption {
  id: string;
  type: 'bus' | 'metro' | 'train';
  name: string;
  pricePerCredit: number;
  icon: string;
}