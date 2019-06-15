namespace EncDecApp
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.button1 = new System.Windows.Forms.Button();
            this.plainText = new System.Windows.Forms.TextBox();
            this.cipherText = new System.Windows.Forms.TextBox();
            this.perm = new System.Windows.Forms.TextBox();
            this.plainText2 = new System.Windows.Forms.TextBox();
            this.Decrypt = new System.Windows.Forms.Button();
            this.permlabel = new System.Windows.Forms.Label();
            this.plainlabel = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Arial", 10F);
            this.label1.Location = new System.Drawing.Point(157, 24);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(652, 23);
            this.label1.TabIndex = 0;
            this.label1.Text = "Block-level encrypting and decrypting using different permutations as key.";
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.button1.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F);
            this.button1.Location = new System.Drawing.Point(123, 417);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(129, 48);
            this.button1.TabIndex = 2;
            this.button1.Text = "Encrypt";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // plainText
            // 
            this.plainText.Location = new System.Drawing.Point(37, 117);
            this.plainText.Multiline = true;
            this.plainText.Name = "plainText";
            this.plainText.Size = new System.Drawing.Size(315, 87);
            this.plainText.TabIndex = 3;
            // 
            // cipherText
            // 
            this.cipherText.Location = new System.Drawing.Point(40, 511);
            this.cipherText.Multiline = true;
            this.cipherText.Name = "cipherText";
            this.cipherText.Size = new System.Drawing.Size(315, 75);
            this.cipherText.TabIndex = 4;
            // 
            // perm
            // 
            this.perm.Location = new System.Drawing.Point(37, 298);
            this.perm.Multiline = true;
            this.perm.Name = "perm";
            this.perm.Size = new System.Drawing.Size(315, 80);
            this.perm.TabIndex = 5;
            // 
            // plainText2
            // 
            this.plainText2.Location = new System.Drawing.Point(482, 511);
            this.plainText2.Multiline = true;
            this.plainText2.Name = "plainText2";
            this.plainText2.Size = new System.Drawing.Size(339, 75);
            this.plainText2.TabIndex = 7;
            // 
            // Decrypt
            // 
            this.Decrypt.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.Decrypt.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F);
            this.Decrypt.Location = new System.Drawing.Point(587, 417);
            this.Decrypt.Name = "Decrypt";
            this.Decrypt.Size = new System.Drawing.Size(145, 48);
            this.Decrypt.TabIndex = 8;
            this.Decrypt.Text = "Decrypt";
            this.Decrypt.UseVisualStyleBackColor = false;
            this.Decrypt.Click += new System.EventHandler(this.Decrypt_Click);
            // 
            // permlabel
            // 
            this.permlabel.AutoSize = true;
            this.permlabel.Location = new System.Drawing.Point(36, 238);
            this.permlabel.Name = "permlabel";
            this.permlabel.Size = new System.Drawing.Size(216, 20);
            this.permlabel.TabIndex = 9;
            this.permlabel.Text = "Write down the perm formula:";
            // 
            // plainlabel
            // 
            this.plainlabel.AutoSize = true;
            this.plainlabel.Location = new System.Drawing.Point(33, 64);
            this.plainlabel.Name = "plainlabel";
            this.plainlabel.Size = new System.Drawing.Size(155, 20);
            this.plainlabel.TabIndex = 10;
            this.plainlabel.Text = "Write down plaintext:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(39, 488);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(157, 20);
            this.label4.TabIndex = 11;
            this.label4.Text = "This is the ciphertext:";
            // 
            // label3
            // 
            this.label3.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.label3.Font = new System.Drawing.Font("Microsoft Sans Serif", 6.5F);
            this.label3.Location = new System.Drawing.Point(37, 258);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(315, 37);
            this.label3.TabIndex = 12;
            this.label3.Text = "(Length must be the same size as the block and must contain only numbers within t" +
    "he block\'s range)";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(478, 488);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(147, 20);
            this.label2.TabIndex = 13;
            this.label2.Text = "This is the plaintext:";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1029, 627);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.plainlabel);
            this.Controls.Add(this.permlabel);
            this.Controls.Add(this.Decrypt);
            this.Controls.Add(this.plainText2);
            this.Controls.Add(this.perm);
            this.Controls.Add(this.cipherText);
            this.Controls.Add(this.plainText);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.label1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.TextBox plainText;
        private System.Windows.Forms.TextBox cipherText;
        private System.Windows.Forms.TextBox perm;
        private System.Windows.Forms.TextBox plainText2;
        private System.Windows.Forms.Button Decrypt;
        private System.Windows.Forms.Label permlabel;
        private System.Windows.Forms.Label plainlabel;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
    }
}

