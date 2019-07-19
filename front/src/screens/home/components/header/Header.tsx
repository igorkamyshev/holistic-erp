import React from 'react'

import { StylingProps } from '&front/utils/StylingProps'

export const Header = ({ className }: StylingProps) => (
  <h1 className={className}>
    Holistic ERP
    <br />
    <small>Просто управлять агенством</small>
  </h1>
)
