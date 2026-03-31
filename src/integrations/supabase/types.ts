export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: number
          name: string
          email: string
          phone: string | null
          service: string | null
          message: string
          submitted_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          phone?: string | null
          service?: string | null
          message: string
          submitted_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          phone?: string | null
          service?: string | null
          message?: string
          submitted_at?: string
        }
        Relationships: []
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          image_url: string | null
          author: string | null
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          image_url?: string | null
          author?: string | null
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          image_url?: string | null
          author?: string | null
          published_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: number
          title: string
          category: string
          image_url: string
          description: string | null
          tech: string[] | null
          client: string | null
          duration: string | null
          year: string | null
          color: string | null
          link: string | null
          created_at: string
        }
        Insert: {
          id?: number
          title: string
          category: string
          image_url: string
          description?: string | null
          tech?: string[] | null
          client?: string | null
          duration?: string | null
          year?: string | null
          color?: string | null
          link?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          title?: string
          category?: string
          image_url?: string
          description?: string | null
          tech?: string[] | null
          client?: string | null
          duration?: string | null
          year?: string | null
          color?: string | null
          link?: string | null
          created_at?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          id: number
          label: string
          value: string
          icon_name: string
          created_at: string
        }
        Insert: {
          id?: number
          label: string
          value: string
          icon_name: string
          created_at?: string
        }
        Update: {
          id?: number
          label?: string
          value?: string
          icon_name?: string
          created_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          id: number
          email: string
          subscribed_at: string
        }
        Insert: {
          id?: number
          email: string
          subscribed_at?: string
        }
        Update: {
          id?: number
          email?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: number
          name: string
          role: string | null
          company: string | null
          content: string
          rating: number
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          role?: string | null
          company?: string | null
          content: string
          rating: number
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          role?: string | null
          company?: string | null
          content?: string
          rating?: number
          image_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          id: string
          order_id: string
          payment_id: string | null
          amount: number
          currency: string
          status: string
          customer_name: string | null
          customer_email: string | null
          plan_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          payment_id?: string | null
          amount: number
          currency?: string
          status?: string
          customer_name?: string | null
          customer_email?: string | null
          plan_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          payment_id?: string | null
          amount?: number
          currency?: string
          status?: string
          customer_name?: string | null
          customer_email?: string | null
          plan_name?: string | null
          created_at?: string
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          id: string
          code: string
          discount_type: "flat" | "percent"
          discount_value: number
          min_order_value: number
          max_discount_value: number | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code: string
          discount_type: "flat" | "percent"
          discount_value: number
          min_order_value?: number
          max_discount_value?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string
          discount_type?: "flat" | "percent"
          discount_value?: number
          min_order_value?: number
          max_discount_value?: number | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: number
          page_path: string
          user_agent: string | null
          viewed_at: string
        }
        Insert: {
          id?: number
          page_path: string
          user_agent?: string | null
          viewed_at?: string
        }
        Update: {
          id?: number
          page_path?: string
          user_agent?: string | null
          viewed_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
  ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
