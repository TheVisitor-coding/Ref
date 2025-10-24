import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAthleteInvoiceAthleteInvoice
  extends Struct.CollectionTypeSchema {
  collectionName: 'athlete_invoices';
  info: {
    displayName: 'Athlete_invoice';
    pluralName: 'athlete-invoices';
    singularName: 'athlete-invoice';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amount: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    athlete_subscription: Schema.Attribute.Relation<
      'manyToOne',
      'api::athlete-subscription.athlete-subscription'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 3;
      }> &
      Schema.Attribute.DefaultTo<'EUR'>;
    description: Schema.Attribute.Text;
    due_date: Schema.Attribute.Date & Schema.Attribute.Required;
    invoice_number: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    invoice_type: Schema.Attribute.Enumeration<
      ['invoice', 'estimate', 'credit_note']
    >;
    issued_date: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::athlete-invoice.athlete-invoice'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON;
    paid_date: Schema.Attribute.Date;
    publishedAt: Schema.Attribute.DateTime;
    statusInvoice: Schema.Attribute.Enumeration<
      ['draft', 'sent', 'paid', 'overdue', 'cancelled']
    >;
    tax_amount: Schema.Attribute.BigInteger & Schema.Attribute.DefaultTo<'0'>;
    tax_rate: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0.2>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAthleteSubscriptionAthleteSubscription
  extends Struct.CollectionTypeSchema {
  collectionName: 'athlete_subscriptions';
  info: {
    displayName: 'Athlete_subscription';
    pluralName: 'athlete-subscriptions';
    singularName: 'athlete-subscription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    athlete: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    athlete_invoices: Schema.Attribute.Relation<
      'oneToMany',
      'api::athlete-invoice.athlete-invoice'
    >;
    auto_renew: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cancellation_reason: Schema.Attribute.Text;
    cancelled_at: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    end_date: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::athlete-subscription.athlete-subscription'
    > &
      Schema.Attribute.Private;
    payments: Schema.Attribute.Relation<'oneToMany', 'api::payment.payment'>;
    pricing_formula: Schema.Attribute.Relation<
      'manyToOne',
      'api::pricing-formula.pricing-formula'
    >;
    publishedAt: Schema.Attribute.DateTime;
    sessions_consumed: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    sessions_remaining: Schema.Attribute.Integer;
    snapshot_name: Schema.Attribute.String & Schema.Attribute.Required;
    snapshot_price: Schema.Attribute.BigInteger;
    snapshot_session_count: Schema.Attribute.Integer;
    snapshot_type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    start_date: Schema.Attribute.Date & Schema.Attribute.Required;
    statusSubscription: Schema.Attribute.Enumeration<
      ['active', 'paused', 'expired', 'cancelled']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAuditLogAuditLog extends Struct.CollectionTypeSchema {
  collectionName: 'audit_logs';
  info: {
    displayName: 'audit_log';
    pluralName: 'audit-logs';
    singularName: 'audit-log';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    action: Schema.Attribute.Enumeration<
      ['create', 'update', 'delete', 'view']
    >;
    affected_user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::audit-log.audit-log'
    > &
      Schema.Attribute.Private;
    new_values: Schema.Attribute.JSON;
    old_values: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    record_id: Schema.Attribute.String & Schema.Attribute.Required;
    table_name: Schema.Attribute.String & Schema.Attribute.Required;
    timestamp: Schema.Attribute.DateTime & Schema.Attribute.DefaultTo<'now'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiCoachAthleteCoachAthlete
  extends Struct.CollectionTypeSchema {
  collectionName: 'coach_athletes';
  info: {
    displayName: 'Coach_athlete';
    pluralName: 'coach-athletes';
    singularName: 'coach-athlete';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    archived_at: Schema.Attribute.DateTime;
    athlete: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    coach: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    invitation_attempts: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    invitation_email: Schema.Attribute.Email & Schema.Attribute.Required;
    invitation_expires_at: Schema.Attribute.DateTime;
    invitation_token: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 64;
      }>;
    invited_at: Schema.Attribute.DateTime & Schema.Attribute.Required;
    joined_at: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::coach-athlete.coach-athlete'
    > &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    status_relation: Schema.Attribute.Enumeration<
      ['pending', 'active', 'archived', 'blocked']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiConversationParticipantConversationParticipant
  extends Struct.CollectionTypeSchema {
  collectionName: 'conversation_participants';
  info: {
    displayName: 'Conversation_participant';
    pluralName: 'conversation-participants';
    singularName: 'conversation-participant';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    conversation: Schema.Attribute.Relation<
      'manyToOne',
      'api::conversation.conversation'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    joined_at: Schema.Attribute.DateTime & Schema.Attribute.Required;
    last_read_at: Schema.Attribute.DateTime;
    left_at: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::conversation-participant.conversation-participant'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Enumeration<['admin', 'member']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiConversationConversation
  extends Struct.CollectionTypeSchema {
  collectionName: 'conversations';
  info: {
    displayName: 'Conversation';
    pluralName: 'conversations';
    singularName: 'conversation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    coach_id: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    conversation_participants: Schema.Attribute.Relation<
      'oneToMany',
      'api::conversation-participant.conversation-participant'
    >;
    conversation_type: Schema.Attribute.Enumeration<['individual', 'group']>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_archived: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    last_message_at: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::conversation.conversation'
    > &
      Schema.Attribute.Private;
    messages: Schema.Attribute.Relation<'oneToMany', 'api::message.message'>;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMessageMessage extends Struct.CollectionTypeSchema {
  collectionName: 'messages';
  info: {
    displayName: 'Message';
    pluralName: 'messages';
    singularName: 'message';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    conversation: Schema.Attribute.Relation<
      'manyToOne',
      'api::conversation.conversation'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    edited_at: Schema.Attribute.DateTime;
    is_edited: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::message.message'
    > &
      Schema.Attribute.Private;
    message_type: Schema.Attribute.Enumeration<
      ['emoji', 'text', 'system', 'file']
    >;
    metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    reply_to: Schema.Attribute.Relation<'oneToOne', 'api::message.message'>;
    sender: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNotificationNotification
  extends Struct.CollectionTypeSchema {
  collectionName: 'notifications';
  info: {
    displayName: 'Notification';
    pluralName: 'notifications';
    singularName: 'notification';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    action_url: Schema.Attribute.Text;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    expires_at: Schema.Attribute.DateTime;
    is_read: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON;
    notification_type: Schema.Attribute.Enumeration<
      [
        'session_created',
        'session_modified',
        'payment_received',
        'message_received',
        'invitation_sent',
        'subscription_expiring',
      ]
    >;
    priority: Schema.Attribute.Enumeration<['low', 'medium', 'high', 'urgent']>;
    publishedAt: Schema.Attribute.DateTime;
    read_at: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiPaymentPayment extends Struct.CollectionTypeSchema {
  collectionName: 'payments';
  info: {
    displayName: 'Payment';
    pluralName: 'payments';
    singularName: 'payment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amount: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    athlete_subscription: Schema.Attribute.Relation<
      'manyToOne',
      'api::athlete-subscription.athlete-subscription'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    failure_reason: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::payment.payment'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON;
    payment_method: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    processed_at: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    refund_amount: Schema.Attribute.BigInteger &
      Schema.Attribute.DefaultTo<'0'>;
    refunded_at: Schema.Attribute.DateTime;
    statusPayment: Schema.Attribute.Enumeration<
      ['pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded']
    >;
    stripe_payment_intent: Schema.Attribute.Text;
    stripe_payment_method: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPlanningConflictPlanningConflict
  extends Struct.CollectionTypeSchema {
  collectionName: 'planning_conflicts';
  info: {
    displayName: 'Planning_conflict';
    pluralName: 'planning-conflicts';
    singularName: 'planning-conflict';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    conflict_type: Schema.Attribute.Enumeration<
      ['time_overlap', 'double_booking', 'resource_conflict']
    > &
      Schema.Attribute.Required;
    conflicting_session: Schema.Attribute.Relation<
      'manyToOne',
      'api::session.session'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::planning-conflict.planning-conflict'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    resolution_action: Schema.Attribute.Enumeration<
      ['moved', 'cancelled', 'kept_conflict']
    >;
    resolution_status: Schema.Attribute.Enumeration<
      ['pending', 'accepted', 'resolved', 'ignored']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    resolved_at: Schema.Attribute.DateTime;
    resolved_by: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    session: Schema.Attribute.Relation<'manyToOne', 'api::session.session'>;
    severity: Schema.Attribute.Enumeration<['blocking', 'warning', 'info']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPlatformInvoicePlatformInvoice
  extends Struct.CollectionTypeSchema {
  collectionName: 'platform_invoices';
  info: {
    displayName: 'Platform_invoice';
    pluralName: 'platform-invoices';
    singularName: 'platform-invoice';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amount: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 3;
      }>;
    due_date: Schema.Attribute.Date & Schema.Attribute.Required;
    invoice_number: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::platform-invoice.platform-invoice'
    > &
      Schema.Attribute.Private;
    paid_at: Schema.Attribute.DateTime;
    publishedAt: Schema.Attribute.DateTime;
    statusInvoice: Schema.Attribute.Enumeration<
      ['draft', 'open', 'paid', 'void', 'uncollectible']
    >;
    stripe_invoice_id: Schema.Attribute.String;
    subscription: Schema.Attribute.Relation<
      'manyToOne',
      'api::platform-subscription.platform-subscription'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPlatformPlanPlatformPlan
  extends Struct.CollectionTypeSchema {
  collectionName: 'platform_plans';
  info: {
    displayName: 'Platform_plan';
    pluralName: 'platform-plans';
    singularName: 'platform-plan';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.JSON & Schema.Attribute.Required;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::platform-plan.platform-plan'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    platform_subscriptions: Schema.Attribute.Relation<
      'oneToMany',
      'api::platform-subscription.platform-subscription'
    >;
    price_monthly: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    price_yearly: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPlatformSubscriptionPlatformSubscription
  extends Struct.CollectionTypeSchema {
  collectionName: 'platform_subscriptions';
  info: {
    displayName: 'Platform_subscription';
    pluralName: 'platform-subscriptions';
    singularName: 'platform-subscription';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    billing_cycle: Schema.Attribute.Enumeration<['monthly', 'yearly']>;
    cancel_at_period_end: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    coach: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    current_period_end: Schema.Attribute.DateTime & Schema.Attribute.Required;
    current_period_start: Schema.Attribute.DateTime & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::platform-subscription.platform-subscription'
    > &
      Schema.Attribute.Private;
    platform_invoices: Schema.Attribute.Relation<
      'oneToMany',
      'api::platform-invoice.platform-invoice'
    >;
    platform_plan: Schema.Attribute.Relation<
      'manyToOne',
      'api::platform-plan.platform-plan'
    >;
    publishedAt: Schema.Attribute.DateTime;
    statusSubscription: Schema.Attribute.Enumeration<
      ['active', 'past_due', 'cancelled', 'unpaid']
    >;
    stripe_customer_id: Schema.Attribute.String;
    stripe_subscription_id: Schema.Attribute.String;
    trial_end: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPricingFormulaPricingFormula
  extends Struct.CollectionTypeSchema {
  collectionName: 'pricing_formulas';
  info: {
    displayName: 'Pricing_formula';
    pluralName: 'pricing-formulas';
    singularName: 'pricing-formula';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    athlete_subscriptions: Schema.Attribute.Relation<
      'oneToMany',
      'api::athlete-subscription.athlete-subscription'
    >;
    coach: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 3;
      }> &
      Schema.Attribute.DefaultTo<'EUR'>;
    description: Schema.Attribute.Text;
    duration_days: Schema.Attribute.Integer;
    formula_type: Schema.Attribute.Enumeration<
      ['per_session', 'package', 'subscription']
    >;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    is_template: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::pricing-formula.pricing-formula'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.BigInteger & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    session_count: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSessionSession extends Struct.CollectionTypeSchema {
  collectionName: 'sessions';
  info: {
    displayName: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    actual_duration_minutes: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    athlete: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    athlete_feedback: Schema.Attribute.Text;
    athlete_rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    base_session: Schema.Attribute.Relation<
      'oneToMany',
      'api::planning-conflict.planning-conflict'
    >;
    child_sessions: Schema.Attribute.Relation<
      'oneToMany',
      'api::session.session'
    >;
    coach: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    coach_rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    conflict_session: Schema.Attribute.Relation<
      'oneToMany',
      'api::planning-conflict.planning-conflict'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    difficulty_level: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 10;
          min: 1;
        },
        number
      >;
    end_datetime: Schema.Attribute.DateTime & Schema.Attribute.Required;
    equipment_needed: Schema.Attribute.Text;
    expected_duration_minutes: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    intensity_level: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'very_high']
    >;
    is_recurring: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    is_template: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::session.session'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    objectives: Schema.Attribute.Text;
    parent_session: Schema.Attribute.Relation<
      'manyToOne',
      'api::session.session'
    >;
    preparation_notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    recurring_rule: Schema.Attribute.JSON;
    requires_presence: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    session_notes: Schema.Attribute.Text;
    session_type: Schema.Attribute.Enumeration<
      ['training', 'consultation', 'personal', 'reminder', 'template']
    > &
      Schema.Attribute.DefaultTo<'training'>;
    start_datetime: Schema.Attribute.DateTime & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<
      [
        'draft',
        'scheduled',
        'confirmed',
        'in_progress',
        'completed',
        'cancelled',
        'conflict_pending',
      ]
    > &
      Schema.Attribute.DefaultTo<'draft'>;
    template_name: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    athlete_relations: Schema.Attribute.Relation<
      'oneToMany',
      'api::coach-athlete.coach-athlete'
    >;
    athlete_subscriptions: Schema.Attribute.Relation<
      'oneToMany',
      'api::athlete-subscription.athlete-subscription'
    >;
    audit_logs: Schema.Attribute.Relation<
      'oneToMany',
      'api::audit-log.audit-log'
    >;
    audit_logs_affected: Schema.Attribute.Relation<
      'oneToMany',
      'api::audit-log.audit-log'
    >;
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    coached_athletes: Schema.Attribute.Relation<
      'oneToMany',
      'api::coach-athlete.coach-athlete'
    >;
    company_name: Schema.Attribute.String;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    conversation_participations: Schema.Attribute.Relation<
      'oneToMany',
      'api::conversation-participant.conversation-participant'
    >;
    conversations: Schema.Attribute.Relation<
      'oneToMany',
      'api::conversation.conversation'
    >;
    country: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 2;
      }> &
      Schema.Attribute.DefaultTo<'FR'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    email_verified_at: Schema.Attribute.DateTime;
    first_name: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    language: Schema.Attribute.Enumeration<['fr', 'en']> &
      Schema.Attribute.DefaultTo<'fr'>;
    last_login_at: Schema.Attribute.DateTime;
    last_name: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    lastPredashboardSeenAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    messages: Schema.Attribute.Relation<'oneToMany', 'api::message.message'>;
    notifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::notification.notification'
    >;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    phone: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    platform_subscriptions: Schema.Attribute.Relation<
      'oneToMany',
      'api::platform-subscription.platform-subscription'
    >;
    pricing_formulas: Schema.Attribute.Relation<
      'oneToMany',
      'api::pricing-formula.pricing-formula'
    >;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    sessions_as_athlete: Schema.Attribute.Relation<
      'oneToMany',
      'api::session.session'
    >;
    sessions_as_coach: Schema.Attribute.Relation<
      'oneToMany',
      'api::session.session'
    >;
    statusUser: Schema.Attribute.Enumeration<
      ['active', 'pending', 'inactive', 'suspended']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::athlete-invoice.athlete-invoice': ApiAthleteInvoiceAthleteInvoice;
      'api::athlete-subscription.athlete-subscription': ApiAthleteSubscriptionAthleteSubscription;
      'api::audit-log.audit-log': ApiAuditLogAuditLog;
      'api::coach-athlete.coach-athlete': ApiCoachAthleteCoachAthlete;
      'api::conversation-participant.conversation-participant': ApiConversationParticipantConversationParticipant;
      'api::conversation.conversation': ApiConversationConversation;
      'api::message.message': ApiMessageMessage;
      'api::notification.notification': ApiNotificationNotification;
      'api::payment.payment': ApiPaymentPayment;
      'api::planning-conflict.planning-conflict': ApiPlanningConflictPlanningConflict;
      'api::platform-invoice.platform-invoice': ApiPlatformInvoicePlatformInvoice;
      'api::platform-plan.platform-plan': ApiPlatformPlanPlatformPlan;
      'api::platform-subscription.platform-subscription': ApiPlatformSubscriptionPlatformSubscription;
      'api::pricing-formula.pricing-formula': ApiPricingFormulaPricingFormula;
      'api::session.session': ApiSessionSession;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
