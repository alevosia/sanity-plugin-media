import {Checkbox, Flex} from '@sanity/ui'
import React, {FC, MouseEvent} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {Box as LegacyBox} from 'theme-ui'

import useTypedSelector from '../../hooks/useTypedSelector'
import {assetsPickAll, assetsPickClear} from '../../modules/assets'
import TableHeaderItem from '../TableHeaderItem'

// TODO: DRY
const ContextActionContainer = styled(Flex)`
  cursor: pointer;
  transition: all 300ms;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: #000; // TODO: use theme colors
    }
  }
`

const TableHeader: FC = () => {
  // Redux
  const dispatch = useDispatch()

  const fetching = useTypedSelector(state => state.assets.fetching)
  const currentDocument = useTypedSelector(state => state.document)
  const byIds = useTypedSelector(state => state.assets.byIds)

  const items = byIds ? Object.values(byIds) : []

  const numPicked = items.filter(item => item.picked).length
  const allSelected = numPicked === items.length

  // Callbacks
  const handleContextActionClick = (e: MouseEvent) => {
    e.stopPropagation()

    if (allSelected) {
      dispatch(assetsPickClear())
    } else {
      dispatch(assetsPickAll())
    }
  }

  return (
    <LegacyBox
      sx={{
        alignItems: 'center',
        bg: '#0a0a0a', // TODO: use theme color
        display: ['none', null, null, 'grid'],
        gridColumnGap: [2, null, null, 3],
        gridTemplateColumns: 'tableLarge',
        height: '2em',
        letterSpacing: '0.025em',
        position: 'sticky',
        textTransform: 'uppercase',
        top: 0,
        width: '100%',
        zIndex: 1 // TODO: try to avoid manually setting z-indices
      }}
    >
      <ContextActionContainer
        align="center"
        justify="center"
        onClick={handleContextActionClick}
        style={{
          height: '100%',
          position: 'relative'
        }}
      >
        {!currentDocument && (
          <Checkbox
            checked={!fetching && allSelected}
            readOnly
            style={{
              pointerEvents: 'none', // TODO: consider alternative for usability
              transform: 'scale(0.8)'
            }}
          />
        )}
      </ContextActionContainer>

      <TableHeaderItem />
      <TableHeaderItem field="originalFilename" title="Filename" />
      <TableHeaderItem title="Resolution" />
      <TableHeaderItem field="mimeType" title="MIME type" />
      <TableHeaderItem field="size" title="Size" />
      <TableHeaderItem field="_updatedAt" title="Last updated" />
      <TableHeaderItem />
    </LegacyBox>
  )
}

export default TableHeader
