// import React, { useState, useEffect } from 'react';
// import { Room } from '@mui/icons-material';
// import { Popover } from '@mui/material';
// import './findLocation.css'; // Import the CSS file

// const LocationComponent = () => {
//     const [address, setAddress] = useState('');
//     const [error, setError] = useState('');
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [loc_name, setLocName] = useState("location");

//     const fetchLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 async (position) => {
//                     const { latitude, longitude } = position.coords;
                    
//                     try {
//                         const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
//                         if (response.ok) {
//                             const data = await response.json();
//                             setAddress(data.address);
//                             setLocName(data.name);
//                             setError('');
//                         } else {
//                             setError('Failed to fetch address.');
//                         }
//                     } catch (error) {
//                         setError('An error occurred while fetching address.');
//                     }
//                 },
//                 (error) => {
//                     setError(error.message);
//                 }
//             );
//         } else {
//             setError('Geolocation is not supported by this browser.');
//         }
//     };

//     useEffect(() => {
//         fetchLocation();
//     }, []); // Empty dependency array ensures this effect runs only once on component mount

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//         fetchLocation();
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const open = Boolean(anchorEl);
//     const id = open ? 'popover-address' : undefined;

//     return (
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//             <Room sx={{ color: '#d918f3' }} onClick={handleClick} />
//             <Popover
//                 id={id}
//                 open={open}
//                 anchorEl={anchorEl}
//                 onClose={handleClose}
//                 anchorOrigin={{
//                     vertical: 'bottom',
//                     horizontal: 'center',
//                 }}
//                 transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'center',
//                 }}
//             >
//                 <div className="popover-content">
//                     {address && (
//                         <>
//                             <p>{Object.values(address).join(', ')}</p>
//                         </>
//                     )}
//                     {error && <p>{error}</p>}
//                 </div>
//                 <div className="popover-arrow" />
//             </Popover>
//             {address && <p className="underline">{loc_name}</p>}
//             {error && <p>{error}</p>}
//         </div>
//     );
// };

// export default LocationComponent;
import React, { useState } from 'react';
import { LocalAtmOutlined, Room, Search } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from '@mui/material';
import './findLocation.css'; 

const LocationComponent = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null); 
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');
    const [loc_name, setLocName] = useState("location");
    const [inputLocation, setInputLocation] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const fetchLocationByQuery = async () => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${inputLocation}&format=json`);
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const firstResult = data[0];
                    setAddress(firstResult);
                    setLocName(firstResult.name);
                    localStorage.setItem('latitude', firstResult.lat);
                    localStorage.setItem('longitude', firstResult.lon);
                    localStorage.setItem('user-address-name',firstResult.name);
                    setTimeout(() => {
                        window.location.reload();
                      }, 1000);
                    setError('');
                } else {
                    setError('Location not found.');
                }
            } else {
                setError('Failed to fetch address.');
            }
        } catch (error) {
            setError('An error occurred while fetching address.');
        }
    };

    const fetchLocationByCoords = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
            if (response.ok) {
                const data = await response.json();
                setAddress(data.address);
                setLocName(data.name);
                localStorage.setItem('latitude', data.lat);
                localStorage.setItem('longitude', data.lon);
                localStorage.setItem('user-address-name',data.name);
                setTimeout(() => {
                    window.location.reload();
                  }, 1000);                 

                setError('');
            } else {
                setError('Failed to fetch address.');
            }
        } catch (error) {
            setError('An error occurred while fetching address.');
        }
    };

    const handleSearchLocation = () => {
        if (inputLocation.trim() !== '') {
            fetchLocationByQuery();
            handleClose();
        }
    };

    const handleCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchLocationByCoords(latitude, longitude);
                handleClose();
            },
            (error) => {
                setError(error.message);
            }
        );
    };

    const handleInputChange = (event) => {
        setInputLocation(event.target.value);
    };

    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget); 
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <Room sx={{ color: '#d918f3', cursor: 'pointer' }} onClick={handleClickOpen} />
            <Dialog
               open={open}
               onClose={handleClose}
               anchorEl={anchorEl} 
               anchorOrigin={{
                   vertical: 'bottom',
                   horizontal: 'left',
               }}
               transformOrigin={{
                   vertical: 'top',
                   horizontal: 'left',
               }}
               sx={{
                   '& .MuiDialog-paper': {
                       width: '80vw', 
                   },
               }}
            >
                <DialogTitle>Choose Location</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column' }}>
                    <Button onClick={handleCurrentLocation} variant="contained" style={{ marginBottom: '1rem' }}>Use Current Location</Button>
                    <Typography variant="subtitle1" style={{ marginBottom: '1rem',  }}><p style={{ textAlign: 'center' }}>OR</p></Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Enter Location"
                        type="text"
                        fullWidth
                        value={inputLocation}
                        onChange={handleInputChange}
                        style={{ marginBottom: '1rem' }}
                    />
                    {localStorage.getItem('user-address-name') && (
                        <Typography><Room/>{localStorage.getItem('user-address-name')}</Typography>
                    )}
                    {error && <Typography>{error}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSearchLocation} variant="contained"><Search /> Search</Button> 
                </DialogActions>
            </Dialog>
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle>Confirmation</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to search?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>No</Button>
                </DialogActions>
            </Dialog>
            
            {localStorage.getItem('user-address-name') && <p className="underline">{localStorage.getItem('user-address-name')}</p>}
      {error && <p>{error}</p>}
        </div>
    );
};

export default LocationComponent;
