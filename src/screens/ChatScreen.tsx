import React, { useRef, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';
import { SPACING } from '../theme/tokens';
import { AppHeader } from '../components/common/AppHeader';
import { MessageBubble } from '../components/chat/MessageBubble';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { ChatInputBar } from '../components/chat/ChatInputBar';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { Message } from '../types';

const GREETING = 'Hi, what can I do for you?';

const STATIC_REPLY =
  'Something went wrong on our end. We are working on it and will be back soon. Please try again later.';

export function ChatScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const flatListRef = useRef<FlatList>(null);
  const seededRef = useRef(false);

  const { messages, isStreaming, addUserMessage, appendStreamChunk, finalizeStreamMessage, setStreaming } =
    useChatStore();
  const { profile } = useAuthStore();

  // Seed the opening assistant greeting once, when the chat is empty.
  useEffect(() => {
    if (!seededRef.current && messages.length === 0) {
      seededRef.current = true;
      appendStreamChunk(GREETING);
      finalizeStreamMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = (text: string) => {
    addUserMessage(text);
    // Static chat: always reply with a generic error message.
    setStreaming(true);
    setTimeout(() => {
      appendStreamChunk(STATIC_REPLY);
      finalizeStreamMessage();
    }, 600);
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length, isStreaming]);

  const renderItem = ({ item }: { item: Message }) => (
    <MessageBubble message={item} />
  );

  const renderFooter = () => {
    if (isStreaming) {
      return <TypingIndicator />;
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, paddingTop: insets.top }]}>
      <AppHeader
        onAvatarPress={() => navigation.navigate('Settings')}
        avatarUrl={profile?.avatarUrl}
      />

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <ChatInputBar
        onSend={handleSend}
        disabled={isStreaming}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: SPACING.base,
  },
});
