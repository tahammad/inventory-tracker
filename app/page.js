'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField, IconButton } from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import DescriptionIcon from '@mui/icons-material/Description'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

const descriptionStyle = {
  ...style,
  width: 500,
}

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [descriptionOpen, setDescriptionOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [newQuantity, setNewQuantity] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [description, setDescription] = useState('')
  const [currentItem, setCurrentItem] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 }, { merge: true })
    } else {
      await setDoc(docRef, { quantity: 1, description: '' })
    }
    await updateInventory()
  }

  const updateItemQuantity = async (item, quantity) => {
    const newQty = Number(quantity)
    const docRef = doc(collection(firestore, 'inventory'), item)

    if (newQty <= 0) {
      await deleteDoc(docRef)
    } else {
      await setDoc(docRef, { quantity: newQty }, { merge: true })
    }

    await updateInventory()
  }

  const incrementItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 }, { merge: true })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 }, { merge: true })
      }
    }
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleDescriptionOpen = (item, desc) => {
    setCurrentItem(item)
    setDescription(desc || '')
    setDescriptionOpen(true)
  }
  const handleDescriptionClose = () => setDescriptionOpen(false)

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const updateDescription = async () => {
    const docRef = doc(collection(firestore, 'inventory'), currentItem)
    await setDoc(docRef, { description }, { merge: true })
    handleDescriptionClose()
    await updateInventory()
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      padding={3}
    >
      {/* Header */}
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        INVENTORY TRACKER
      </Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction={'row'} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Modal
        open={descriptionOpen}
        onClose={handleDescriptionClose}
        aria-labelledby="description-modal-title"
        aria-describedby="description-modal-description"
      >
        <Box sx={descriptionStyle}>
          <Typography id="description-modal-title" variant="h6" component="h2">
            Edit Description
          </Typography>
          <TextField
            id="description-textfield"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button variant="outlined" onClick={updateDescription}>
            Save
          </Button>
        </Box>
      </Modal>

      <Button variant="contained" onClick={handleOpen}>
        Add New Item
      </Button>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Box border={'1px solid #333'} width="1200px">
        <Box display="flex" justifyContent="space-between" bgcolor={'#ADD8E6'} paddingX={5} paddingY={2}>
          <Typography variant="h5" color="#333" style={{ flex: 2 }}>
            Item
          </Typography>
          <Typography variant="h5" color="#333" style={{ flex: 1, textAlign: 'center' }}>
            Quantity
          </Typography>
          <Typography variant="h5" color="#333" style={{ flex: 3 }}>
            
          </Typography>
        </Box>
        <Stack width="100%" height="300px" spacing={2} overflow={'auto'}>
          {filteredInventory.map(({ name, quantity, description }) => (
            <Box
              key={name}
              width="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor={'#f0f0f0'}
              paddingX={5}
              paddingY={1}
            >
              <Typography variant={'h6'} color={'#333'} style={{ flex: 2 }}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              {editingItem === name ? (
                <Box display="flex" alignItems="center" style={{ flex: 1, justifyContent: 'center' }}>
                  <TextField
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    type="number"
                    variant="outlined"
                    size="small"
                  />
                  <IconButton
                    onClick={() => {
                      updateItemQuantity(name, newQuantity)
                      setEditingItem(null)
                      setNewQuantity('')
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                </Box>
              ) : (
                <Box display="flex" alignItems="center" style={{ flex: 1, justifyContent: 'center' }}>
                  <Typography
                    variant={'h6'}
                    color={'#333'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setEditingItem(name)
                      setNewQuantity(quantity)
                    }}
                  >
                    {quantity}
                  </Typography>
                </Box>
              )}
              <Stack direction="row" spacing={2} style={{ flex: 3, justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={() => incrementItem(name)}>
                  Add
                </Button>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
                {editingItem === name ? (
                  <IconButton
                    onClick={() => {
                      setEditingItem(null)
                      setNewQuantity('')
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      setEditingItem(name)
                      setNewQuantity(quantity)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => handleDescriptionOpen(name, description)}
                >
                  <DescriptionIcon />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}
