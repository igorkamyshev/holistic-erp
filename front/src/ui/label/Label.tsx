import React, { ReactNode } from 'react'
import cx from 'classnames'

import { StylingProps } from '&front/utils/StylingProps'

import s from './Label.css'

interface Props {
  text: string
  children: ReactNode
}

export const Label = ({ className, children, text }: Props & StylingProps) => (
  <label className={cx(className, s.label)}>
    <span>{text}</span>
    {children}
  </label>
)
