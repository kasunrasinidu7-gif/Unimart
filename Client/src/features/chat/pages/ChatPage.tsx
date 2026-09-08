import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import StorefrontIcon from '@mui/icons-material/Storefront';
import Grid from '@mui/material/Grid';
import apiClient from '../../../services/apiClient';
import { useAppSelector } from '../../../app/hooks';

interface Conversation {
  id: number;
  listingId: number;
  buyerId: number;
  sellerId: number;
  listingTitle?: string;
}

interface MessageItem {
  id: number;
  conversationId: number;
  senderId: number;
  messageText: string;
  createdAt: string;
}

export function Component() {
  const { user } = useAppSelector((state) => state.auth);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<Conversation[]>('/conversations');
      if (Array.isArray(data) && data.length > 0) {
        setConversations(data);
        setSelectedConv(data[0]);
      } else {
        // Fallback demo conversation
        const demoConv: Conversation = {
          id: 1,
          listingId: 1,
          buyerId: user?.id || 1,
          sellerId: 101,
          listingTitle: 'Database Management Systems 8th Edition',
        };
        setConversations([demoConv]);
        setSelectedConv(demoConv);
      }
    } catch (err) {
      const demoConv: Conversation = {
        id: 1,
        listingId: 1,
        buyerId: user?.id || 1,
        sellerId: 101,
        listingTitle: 'Database Management Systems 8th Edition',
      };
      setConversations([demoConv]);
      setSelectedConv(demoConv);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (convId: number) => {
    try {
      const data = await apiClient.get<MessageItem[]>(`/messages?conversationId=${convId}`);
      if (Array.isArray(data)) {
        setMessages(data);
        return;
      }
    } catch (e) {
      // Fallback demo messages
    }
    setMessages([
      {
        id: 1,
        conversationId: convId,
        senderId: 101,
        messageText: 'Hello! Is this item still available for campus meetup?',
        createdAt: '10:00 AM',
      },
      {
        id: 2,
        conversationId: convId,
        senderId: user?.id || 1,
        messageText: 'Yes, it is available! We can meet at the Science Faculty Canteen.',
        createdAt: '10:02 AM',
      },
    ]);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (selectedConv) {
      fetchMessages(selectedConv.id);
    }
  }, [selectedConv]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConv) return;

    const text = inputText.trim();
    setInputText('');
    setSending(true);

    try {
      const newMessage = await apiClient.post<MessageItem>('/messages', {
        conversationId: selectedConv.id,
        senderId: user?.id || 1,
        messageText: text,
      });

      if (newMessage && newMessage.id) {
        setMessages((prev) => [...prev, newMessage]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            conversationId: selectedConv.id,
            senderId: user?.id || 1,
            messageText: text,
            createdAt: 'Just now',
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          conversationId: selectedConv.id,
          senderId: user?.id || 1,
          messageText: text,
          createdAt: 'Just now',
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <ChatIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
          Campus Messenger
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', height: 600 }}>
          <Grid container sx={{ height: '100%' }}>
            {/* Left Sidebar: Conversations list */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ borderRight: 1, borderColor: 'divider', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  Active Conversations ({conversations.length})
                </Typography>
              </Box>
              <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
                {conversations.map((conv) => (
                  <Box key={conv.id}>
                    <ListItemButton
                      selected={selectedConv?.id === conv.id}
                      onClick={() => setSelectedConv(conv)}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <StorefrontIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={conv.listingTitle || `Listing #${conv.listingId}`}
                        secondary={`Conversation #${conv.id}`}
                        slotProps={{ primary: { sx: { fontWeight: 600 }, noWrap: true } }}
                      />
                    </ListItemButton>
                    <Divider variant="inset" component="li" />
                  </Box>
                ))}
              </List>
            </Grid>

            {/* Right Chat Area */}
            <Grid size={{ xs: 12, md: 8 }} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <Box sx={{ p: 2, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                      <StorefrontIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {selectedConv.listingTitle || `Listing #${selectedConv.listingId}`}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Chatting regarding item listing
                      </Typography>
                    </Box>
                  </Box>

                  {/* Messages Feed */}
                  <Box sx={{ flex: 1, p: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, bgcolor: 'grey.50' }}>
                    {messages.map((msg) => {
                      const isMe = msg.senderId === (user?.id || 1);
                      return (
                        <Box
                          key={msg.id}
                          sx={{
                            alignSelf: isMe ? 'flex-end' : 'flex-start',
                            maxWidth: '75%',
                          }}
                        >
                          <Paper
                            elevation={1}
                            sx={{
                              p: 2,
                              borderRadius: 3,
                              bgcolor: isMe ? 'primary.main' : 'white',
                              color: isMe ? 'white' : 'text.primary',
                              borderBottomRightRadius: isMe ? 0 : 3,
                              borderBottomLeftRadius: isMe ? 3 : 0,
                            }}
                          >
                            <Typography variant="body1">{msg.messageText}</Typography>
                          </Paper>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 0.5, textAlign: isMe ? 'right' : 'left', px: 0.5 }}
                          >
                            {msg.createdAt}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>

                  {/* Message Input Bar */}
                  <Box component="form" onSubmit={handleSendMessage} sx={{ p: 2, bgcolor: 'white', borderTop: 1, borderColor: 'divider', display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Type a message..."
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                    <IconButton
                      type="submit"
                      color="primary"
                      disabled={sending || !inputText.trim()}
                      sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' }, '&.Mui-disabled': { bgcolor: 'action.disabledBackground' } }}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                  <Typography color="text.secondary">Select a conversation to start chatting</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      )}
    </Container>
  );
}

export default Component;
